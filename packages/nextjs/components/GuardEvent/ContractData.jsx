import { useState } from "react";
import { useScaffoldContractRead, useScaffoldEventSubscriber} from "~~/hooks/scaffold-eth";
import { useRouter } from 'next/router'

export default function ContractData() {
  const router = useRouter()
  const id = router.query.event
  const [entered, setEntered] = useState(false)
  const [entrantsHash, setEntrantsHash] = useState('')
  const [tokenId, setTokenId] = useState()
  const [saved, setSaved] = useState(true)


  const { data: eventInfo } = useScaffoldContractRead("EventGate", "events", [id]);

  useScaffoldEventSubscriber("EventGate", "EventEntered", (eventId, eventHash, entrantHash, eventTicketId, entrant, ticketAddress, eventName, time) => {
    console.log("eventTicketId:", eventTicketId.toString())
    if(tokenId == eventTicketId.toString() ){
      setEntered(true)
      setEntrantsHash(entrantHash)
      setEntrants(entrant)
    }
  }, true);

  return (
    
    <div className="flex flex-col items-center bg-[url('/assets/gradient-1.png')] bg-[length:100%_100%] py-5 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
      {!entered &&
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full`}
      >
        <div className="card w-100 bg-base-100 shadow-xl">
          <figure><img src="https://openmoji.org/data/color/svg/1F39F.svg" alt="Ticket" /></figure>
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
            <h3 className="text-primary">listening....</h3>
            <div className="card-actions justify-end">
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
            <img src='https://openmoji.org/data/color/svg/1F44C.svg' alt="DJ man" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Let them in!</h2>
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
