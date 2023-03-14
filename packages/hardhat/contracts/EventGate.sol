// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */

contract EventGate is Ownable {

    struct EventInfo {
      address ticketAddress;
      string eventName;
      uint256 eventId;
      address eventCreator;
      bytes32 eventHash;
    }

    using Counters for Counters.Counter;
    Counters.Counter private eventIdCounter;
    uint256 public entranceCost;
    uint256 public createEventCost;

    mapping(uint256 => EventInfo) public events;
    mapping(bytes32 => uint256) public eventHashToEventId;
    mapping(bytes32 => bool) public eventExists;


    event EventCreated(uint256 indexed eventId, bytes32 indexed eventHash, address ticketAddress, string eventName);
    event EventEntered(uint256 indexed eventId, bytes32 indexed eventHash, bytes32 indexed entrantHash, uint256 indexed eventTicketId, 
                     address entrant, address ticketAddress, string eventName, uint256 time);

    constructor(){}

    function createEvent(address _ticketAddress, string _eventName) external returns(uint256){
      bytes32 _eventHash = keccak256(abi.encode(_ticketAddress,_eventName));
      require(eventExists(_eventHash) != true, 'event already exists');
      eventIdCounter.increment();
      uint256 _eventId = eventIdCounter.current();
      eventHashToEventId[_eventHash] =  _eventId;
      eventExists[_eventHash] = true;
      EventInfo storage _eventInfo = events[_eventId];
      _eventInfo.eventAddress = _ticketAddress;
      _eventInfo.eventName = _eventName;
      _eventInfo.eventId = _eventId;
      _eventInfo.eventCreator = msg.sender;
      _eventInfo.eventHash = _eventHash;
      emit EventCreated(_eventId, _eventHash, _ticketAddress, _eventName);
      return _eventId;
    }

    function enterEvent(address _ticketAddress, string _eventName, uint256 _eventTicketId) external returns(bytes32){
      require(IERC721(_ticketAddress).ownerOf(_eventTicketId) == msg.sender, "You must own the token you are entering with");
      bytes32 _eventHash = keccak256(abi.encode(_ticketAddress,_eventName));
      require(eventExists(_eventHash), "This event does not exist");
      bytes32 _entrantHash = keccak256(abi.encode(msg.sender,_eventTicketId));
      emit EventEntered(_eventId, _eventHash, _entrantHash, _eventTicketId, msg.sender, _ticketAddress, _eventName, block.timestamp);
      return _entrantHash;
    }

    constructor() {}

    receive() external payable {}
}