import { SetStateAction, useEffect, useRef, useState } from "react";
import { useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";
import { useAnimationConfig } from "~~/hooks/scaffold-eth/useAnimationConfig";
import PartyIcon from "./assets/PartyPopper.svg";
import { Address, Unit } from "wagmi";

const MARQUEE_PERIOD_IN_SEC = 5;

export default function ContractData() {
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  //const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);
  const [eventFound, setEventFound] = useState<boolean>(false);
  const [eventReciept, setEventReciept] = useState({})
  const [deventId, setDeventId] = useState<unknown>()

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const { data: totalCounter } = useScaffoldContractRead<BigNumber>("YourContract", "totalCounter");
  const { data: eventIdCounter } = useScaffoldContractRead<BigNumber>("EventGate", "EventIdCounter");
 

  useScaffoldEventSubscriber("YourContract", "GreetingChange", (greetingSetter, newGreeting, premium, value) => {
    console.log(greetingSetter, newGreeting, premium, value);
  });
  useScaffoldEventSubscriber("EventGate", "EventCreated", (eventId, eventHash, ticketAddress, eventName, eventOwner) => {
    console.log(eventId, eventHash, ticketAddress, eventName, eventOwner);
    setDeventId(eventId)
    setEventReciept({"eventId" : eventId , "eventHash": eventHash, "ticketAddress": ticketAddress, "eventName":eventName,
      "eventOwner": eventOwner});
      setEventFound(true);
  });


  const { showAnimation } = useAnimationConfig(totalCounter);

  //const showTransition = transitionEnabled && !!currentGreeting && !isGreetingLoading;

  useEffect(() => {
    if (transitionEnabled && containerRef.current && greetingRef.current) {
      setMarqueeSpeed(
        Math.max(greetingRef.current.clientWidth, containerRef.current.clientWidth) / MARQUEE_PERIOD_IN_SEC,
      );
    }
  }, [transitionEnabled, containerRef, greetingRef]);

  return (
    
    <div className="flex flex-col items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-5 px-5 sm:px-0 lg:py-auto max-w-[100vw]">

      {eventFound &&<div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
          showAnimation ? "animate-zoom" : ""
        }`}
      >
        
        <div className="flex justify-end w-full">
          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Event ID</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {eventFound ? eventIdCounter.toNumber() + 1 : "?"}
            </div>
          </div>
        </div>

        <div className="card mt-3 border border-primary bg-neutral rounded-3xl w-90 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src='https://openmoji.org/data/color/svg/1F389.svg' alt="Party Popper" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Event Made!</h2>
            <p></p>
            <div className="card-actions">
              <button className="btn btn-primary">Start Event</button>
            </div>
          </div>
        </div>
      </div>}
    </div> 
  );
}
