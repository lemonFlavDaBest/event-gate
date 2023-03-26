import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useRouter } from 'next/router'

export default function ContractData() {
  const router = useRouter()
  const id = router.query.event

  const { data: eventInfo } = useScaffoldContractRead("EventGate", "events", [id]);
  const { data: eventStarted } = useScaffoldContractRead("EventGate", "eventInProgress", [id]);
  const { writeAsync, isLoading } = useScaffoldContractWrite("EventGate", "changeEventStatus", [id]);
  console.log("eventInfo:", eventInfo)

  return (
    
    <div className="flex flex-col items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-5 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
{eventInfo &&
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full`}
      >
        <div className="flex justify-end w-full">
          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Event ID</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {id}
            </div>
          </div>
        </div> 
        <div className="card mt-3 border border-primary bg-neutral rounded-3xl w-90 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src='https://openmoji.org/data/color/svg/1F468-200D-1FAA9.svg' alt="DJ man" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{eventInfo[1]}</h2>
            <p style={{fontSize: 8}}>Ticket: {eventInfo[0]}</p>
            <p style={{fontSize: 6}}>Event Hash: {eventInfo[4]}</p>
            <div className="card-actions">
              {eventStarted ?
              <>
                <p style={{fontSize:10}}>Event Has Begun</p>
                <button className={`btn btn-secondary ${
                    isLoading ? "loading" : ""
                 }`} onClick={writeAsync}>Pause Event?</button>
              </>
              :
              <>
              <p style={{fontSize:10}}>Event Has Not Started</p>
              <button className={`btn btn-primary ${
                    isLoading ? "loading" : ""
                 }`} onClick={writeAsync}>Start Event?</button>
              </>
              }
            </div>
          </div>
        </div>
      </div>}
    </div> 
  );
}
