import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";
import { useAnimationConfig } from "~~/hooks/scaffold-eth/useAnimationConfig";

const MARQUEE_PERIOD_IN_SEC = 5;

export default function ContractData() {
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);
  const [eventReciept, setEventReceipt] = useState({})

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const { data: totalCounter } = useScaffoldContractRead<BigNumber>("YourContract", "totalCounter");

  const { data: currentGreeting, isLoading: isGreetingLoading } = useScaffoldContractRead<string>(
    "YourContract",
    "greeting",
  );

  useScaffoldEventSubscriber("YourContract", "GreetingChange", (greetingSetter, newGreeting, premium, value) => {
    console.log(greetingSetter, newGreeting, premium, value);
  });
  useScaffoldEventSubscriber("EventGate", "EventCreated", (eventId, eventHash, ticketAddress, eventName, eventOwner) => {
    console.log(eventId, eventHash, ticketAddress, eventName, eventOwner);
    setEventReceipt({...eventReciept, "eventId": eventId, "eventHash":eventHash, "ticketAddress": ticketAddress, 
                      "eventName": eventName, "eventOwner": eventOwner})
  });


  const { showAnimation } = useAnimationConfig(totalCounter);

  const showTransition = transitionEnabled && !!currentGreeting && !isGreetingLoading;

  useEffect(() => {
    if (transitionEnabled && containerRef.current && greetingRef.current) {
      setMarqueeSpeed(
        Math.max(greetingRef.current.clientWidth, containerRef.current.clientWidth) / MARQUEE_PERIOD_IN_SEC,
      );
    }
  }, [transitionEnabled, containerRef, greetingRef]);

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
          showAnimation ? "animate-zoom" : ""
        }`}
      >
        <div className="flex justify-end w-full">
          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Total count</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {totalCounter?.toString() || "0"}
            </div>
          </div>
        </div>

        <div className="mt-3 border border-primary bg-neutral rounded-3xl text-secondary  overflow-hidden text-[116px] whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight">
          <div className="relative overflow-x-hidden" ref={containerRef}>
            {/* for speed calculating purposes */}
            <div className="absolute -left-[9999rem]" ref={greetingRef}>
              <div className="px-4">{currentGreeting}</div>
            </div>
            {new Array(3).fill("").map((_, i) => {
              const isLineRightDirection = i % 2 ? isRightDirection : !isRightDirection;
              return (
                <Marquee
                  key={i}
                  direction={isLineRightDirection ? "right" : "left"}
                  gradient={false}
                  play={showTransition}
                  speed={marqueeSpeed}
                  className={i % 2 ? "-my-10" : ""}
                >
                  <div className="px-4">{currentGreeting || " "}</div>
                </Marquee>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
