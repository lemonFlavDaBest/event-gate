import { ArrowSmallRightIcon} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function ContractInteraction() {
  const [visible, setVisible] = useState(true);
  const [newGreeting, setNewGreeting] = useState("");
  const [eventName, setEventName] = useState("");
  const [ticketAddress, setTicketAddress] = useState("");
  const [startEvent, setStartEvent] = useState(false);

  const { writeAsync, isLoading } = useScaffoldContractWrite("EventGate", "createEvent", [ticketAddress, eventName, startEvent],  "0.001");

  return (
    <div className="flex bg-base-200 relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Create Event :)</span>

          <div className="mt-8 flex flex-col flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Ticket Address"
              className="input w-full px-5 bg-[url('/assets/gradient-2.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-gray"
              onChange={e => setTicketAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Event Name"
              className="input w-full px-5 bg-[url('/assets/gradient-2.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-gray"
              onChange={e => setEventName(e.target.value)}
            />
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text px-3">Start Event Now?</span> 
                <input type="checkbox" checked={startEvent} onChange = {() => setStartEvent(!startEvent)} className="checkbox checkbox-secondary" />
              </label>
            </div>
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={writeAsync}
                >
                  {!isLoading && (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">.0001 ETH + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
