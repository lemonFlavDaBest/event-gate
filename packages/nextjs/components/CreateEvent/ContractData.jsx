import { SetStateAction, useEffect, useRef, useState } from "react";
import { useScaffoldContractRead, useScaffoldEventSubscriber, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";
import { useAnimationConfig } from "~~/hooks/scaffold-eth/useAnimationConfig";
import { Address, Unit } from "wagmi";
import { Connector, useAccount, useConnect } from "wagmi";
import Link from "next/link";


const MARQUEE_PERIOD_IN_SEC = 5;

export default function ContractData() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  //const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);
  const [eventFound, setEventFound] = useState(false);
  const [eventReciept, setEventReciept] = useState({})
  const [deventId, setDeventId] = useState('')
  const [deventHash, setDeventHash] = useState('')
  const [dTicketAddress, setDTicketAddress] = useState('')
  const [deventName, setDeventName] = useState('')
  const [deventOwner, setDeventOwner] = useState('')

  const containerRef = useRef(null);
  const greetingRef = useRef(null);

  const { data: totalCounter } = useScaffoldContractRead("YourContract", "totalCounter");
  const { data: eventIdCounter } = useScaffoldContractRead("EventGate", "eventIdCounter");

 

  useScaffoldEventSubscriber("EventGate", "EventCreated", (eventId, eventHash, ticketAddress, eventName, eventOwner) => {
    if(eventOwner == address ){
    console.log(eventId.toNumber(), eventHash, ticketAddress, eventName, eventOwner);
    setDeventId(eventId.toNumber())
    setDeventHash(eventHash)
    setDTicketAddress(ticketAddress)
    setDeventName(eventName)
    setDeventOwner(eventOwner)
    setEventReciept({"eventId" : eventId , "eventHash": eventHash, "ticketAddress": ticketAddress, "eventName":eventName,
      "eventOwner": eventOwner});
      setEventFound(true);
    }
  }, true);


  const { showAnimation } = useAnimationConfig(totalCounter);


  return (
    
    <div className="flex flex-col items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-5 px-5 sm:px-0 lg:py-auto max-w-[100vw]">

      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
          showAnimation ? "animate-zoom" : ""
        }`}
      >
        
        <div className="flex justify-end w-full">
          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Event ID</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {eventFound && eventIdCounter ? eventIdCounter.toNumber() - 1 : "?"}
            </div>
          </div>
        </div>
        {eventFound &&
        <div className="card mt-3 border border-primary bg-neutral rounded-3xl w-90 bg-base-100 shadow-xl">
          
          <figure className="px-10 pt-10">
            <img src='https://openmoji.org/data/color/svg/1F389.svg' alt="Party Popper" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Event Made!</h2>
            <h4>{deventName}</h4>
            <p style={{fontSize: 8}}>Ticket: {dTicketAddress}</p>
            <p style={{fontSize: 6}}>{deventHash}</p>
            <div className="card-actions">
              
              <Link type = "button" href ="/view-events" className='btn btn-secondary'>View Events</Link>
              
            </div>
          </div>
        </div>}
      </div>
    </div> 
  );
}
