const { Alchemy, Network, Utils } = require('alchemy-sdk');
import { useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";
import { useAccount } from "wagmi";
import Link from "next/link";


export default function ContractData() {

const abi = utils.defaultAbiCoder;
const { address } = useAccount()
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

const DEVENTS_CONTRACT_ADDRESS = '0xAaFA715739BB762De2A7C33c9B596A1351616ff1';
const deventAbiString = `[
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_createEventFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_entranceFee",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "eventHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "ticketAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "eventName",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "eventOwner",
        "type": "address"
      }
    ],
    "name": "EventCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "eventHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "entrantHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "eventTicketId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "entrant",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "ticketAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "eventName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "EventEntered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "EventFinished",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "EventStarted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_eventId",
        "type": "uint256"
      }
    ],
    "name": "changeEventStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ticketAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_eventName",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "startEvent",
        "type": "bool"
      }
    ],
    "name": "createEvent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createEventFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ticketAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_eventName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_eventTicketId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_eventId",
        "type": "uint256"
      }
    ],
    "name": "enterEvent",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "entranceFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "eventExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "eventHashToEventId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "eventIdCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "eventInProgress",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "events",
    "outputs": [
      {
        "internalType": "address",
        "name": "ticketAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "eventName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "eventCreator",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "eventHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "eventsOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`;

const DEVENTS_INTERFACE = new Utils.Interface(deventAbiString);
console.log(DEVENTS_INTERFACE)
const DEVENTS_MY_EVENTS = DEVENTS_INTERFACE.encodeFilterTopics('EventCreated', []);

console.log(DEVENTS_MY_EVENTS)

async function getMyDevents() {
  if(address){
  const encodedAddy = abi.encode(["address"], [address])
  
  console.log("addy:", encodedAddy)
  console.log("DEVENTS_MY_EVENTS:", DEVENTS_MY_EVENTS)
  const logs = await alchemy.core.getLogs({
    fromBlock: '0x0',
    toBlock: 'latest',
    address: DEVENTS_CONTRACT_ADDRESS,
    topics: [DEVENTS_MY_EVENTS[0]],
    data: encodedAddy
  });
  setLogsRetrieved(true)
  console.log(typeof(logs))
  responseData.push(logs)
  console.log("data", responseData[0])
  console.log("logs:", logs);
}
}


  const [logsRetrieved, setLogsRetrieved] = useState(false)
  const [responseData, setResponseData] = useState([])

  useEffect(() => {
    getMyDevents()
  }, [address]);


  return (
    <div className="flex flex-col items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      
      <div className="mt-1">
      {logsRetrieved && <table className="table table-zebra w-full">
      {/* head */}
          <thead>
            <tr>
              <th>Unique Event Hash</th>
              <th>Event Id</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
           {responseData.length > 0 && responseData[0].map((event, index) => {
            const eventId = BigNumber.from(event.topics[1]).toString()
            console.log('end it', eventId)
            return (
              <tr key={index}>
              <td style={{fontSize:5}}>{event.topics[0]}</td>
              <td style={{fontSize:10}}>{eventId}</td>
              <td style={{fontSize:10}}><Link href={`/events/${eventId}`}>View Event</Link></td>
              </tr>
              
            )
          })}
          </tbody> 
        </table>}
        
      </div>


    </div>
  );
}
