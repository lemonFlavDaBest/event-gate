import { useEffect,  useState } from "react";
import { useScaffoldContractRead, useScaffoldEventSubscriber, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

import { useAccount} from "wagmi";

import { useRouter } from 'next/router'



export default function ContractData() {
  const router = useRouter()
  const id = router.query.event
  const { address } = useAccount()
  
  
  const [dTicketAddress, setDTicketAddress] = useState('')
  
  const [entered, setEntered] = useState(false)
  
  const [entrantsHash, setEntrantsHash] = useState('')
 
  const [eventsName, setEventsName] = useState()
  const [tokenId, setTokenId] = useState()
  const [saved, setSaved] = useState(true)



  const { data: eventInfo } = useScaffoldContractRead("EventGate", "events", [id]);
  
  const { writeAsync } = useScaffoldContractWrite("EventGate", "enterEvent", [dTicketAddress, eventsName, tokenId, id],  '0.000000000000000002');


 

  useScaffoldEventSubscriber("EventGate", "EventEntered", (eventId, eventHash, entrantHash, eventTicketId, entrant, ticketAddress, eventName, time) => {
    if(entrant == address ){
      setEntered(true)
      setEntrantsHash(entrantHash)
      setEventsName(eventName)
    }
  }, true);

  useEffect(() => {
    if (eventInfo){
    setDTicketAddress(eventInfo[0])
    setEventsName(eventInfo[1])
    }
  }, [eventInfo])



  return (
    
    <div className="flex flex-col items-center bg-[url('/assets/gradient-4.png')] bg-[length:100%_100%] py-5 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
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
            <h2 className="card-title">It worked!</h2>
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
