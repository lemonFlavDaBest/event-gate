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
    uint256 public enterCost;
    uint256 public eventCost;

    mapping(uint256 => EventInfo) public events;
    mapping(bytes32 => uint256) public eventHashToEventId;
    mapping(bytes32 => bool) public eventExists;

    event EventCreated(string eventName, address ticketAddress, bytes32 indexed eventHash, uint256 indexed eventId);
    event EnterEvent(string eventName, address entrant, bytes32 indexed entrantHash, uint256 time, address ticketAddress, 
                    uint256 indexed eventTicketId, bytes32 indexed eventHash, uint256 indexed eventId);

    function createEvent(address _ticketAddress, string _eventName) external returns(uint256){
      bytes32 _eventHash = keccak256(abi.encode(_ticketAddress, _eventName));
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
      emit EventCreated(_eventName, _ticketAddress, _eventHash, _eventId);
      return _eventId;
    }

    function enterEvent(address _ticketAddress, string _eventName, uint256 _eventTicketId) returns(bytes32 _entrantHash){
      
    }

    constructor() {}

    receive() external payable {}
}