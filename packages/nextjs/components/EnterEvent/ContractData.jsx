import { SetStateAction, useEffect, useRef, useState } from "react";
import { useScaffoldContractRead, useScaffoldEventSubscriber, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";
import { useAnimationConfig } from "~~/hooks/scaffold-eth/useAnimationConfig";

import { Address, Unit } from "wagmi";
import { Connector, useAccount, useConnect } from "wagmi";
import Link from "next/link";
import { useRouter } from 'next/router'


const MARQUEE_PERIOD_IN_SEC = 5;

export default function ContractData() {
  const router = useRouter()
  const id = router.query.event
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
  const [entered, setEntered] = useState(false)
  const [eventsHash, setEventsHash] = useState()
  const [entrantsHash, setEntrantsHash] = useState('')
  const [contractAddress, setContractAddress] = useState()
  const [eventsName, setEventsName] = useState()
  const [tokenId, setTokenId] = useState()
  const [saved, setSaved] = useState(true)

  const containerRef = useRef(null);
  const greetingRef = useRef(null);

  const { data: eventInfo } = useScaffoldContractRead("EventGate", "events", [id]);
  const { data: totalCounter } = useScaffoldContractRead("YourContract", "totalCounter");
  const { data: eventIdCounter } = useScaffoldContractRead("EventGate", "eventIdCounter");
  const { writeAsync, isLoading } = useScaffoldContractWrite("EventGate", "enterEvent", [dTicketAddress, eventsName, tokenId, id],  '0.000000000000000002');


 

  useScaffoldEventSubscriber("EventGate", "EventEntered", (eventId, eventHash, entrantHash, eventTicketId, entrant, ticketAddress, eventName, time) => {
    if(entrant == address ){
      setEntered(true)
      setEventsHash(eventHash)
      setEntrantsHash(entrantHash)
      setContractAddress(ticketAddress)
      setEventsName(eventName)
    }
  }, true);

  useEffect(() => {
    if (eventInfo){
    setDTicketAddress(eventInfo[0])
    setEventsName(eventInfo[1])
    }
  }, [eventInfo])



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
      {!entered &&
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full`}
      >
        <div className="card w-100 bg-base-100 shadow-xl">
          <figure><img src="https://openmoji.org/data/color/svg/1F973.svg" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              {saved ? "wait!" : `Token #${tokenId}`}
            </h2>
            
            {saved ? 
            <>
            <input
              type="number"
              placeholder="Enter TokenID here"
              className="input border border-primary"
              onChange={e => setTokenId(e.target.value)}
            />
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={()=> setSaved(false)}>Save</button>
            </div>
            </> :
            <>
            <h3 className="text-primary">Show this # before you hit enter!</h3>
            <div className="card-actions justify-end">
            <button className="btn btn-secondary" onClick= {()=> writeAsync()}>ENTER EVENT</button>
              <button className="btn btn-accent" onClick= {()=> setSaved(true)}>Cancel</button>
            </div>

            </>
            }
          </div>
        </div>
      </div>}
{eventInfo && entered &&
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 my-4 w-full`}
      >
        
        <div className="card mt-3 border border-primary bg-neutral rounded-3xl w-90 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src='https://openmoji.org/data/color/svg/2714.svg' alt="DJ man" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{eventInfo[1]}</h2>
            <h3 className="card-title">{id}</h3>
            <p style={{fontSize: 8}}>Ticket: {eventInfo[0]}</p>
            <p style={{fontSize: 6}}>Event Hash: {eventInfo[4]}</p>
            <p style={{fontSize: 6}}>Entrance Hash: {entrantsHash}</p>
          </div>
        </div>
      </div>}
    
    </div> 
  );
}
