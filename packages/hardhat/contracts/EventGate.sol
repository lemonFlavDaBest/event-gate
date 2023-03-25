// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */

contract EventGate {

    struct EventInfo {
      address ticketAddress;
      string eventName;
      uint256 eventId;
      address eventCreator;
      bytes32 eventHash;
    }

    address public immutable owner;
    uint256 public eventIdCounter;
    uint256 public createEventFee;
    uint256 public entranceFee;

    mapping(uint256 => EventInfo) public events;
    mapping(bytes32 => uint256) public eventHashToEventId;
    mapping(bytes32 => bool) public eventExists;
    mapping(uint256 => bool) public eventInProgress;
    mapping(uint256 => address) public eventsOwner;



    event EventCreated(uint256 indexed eventId, bytes32 indexed eventHash, address ticketAddress, string eventName, address indexed eventOwner);
    event EventEntered(uint256 indexed eventId, bytes32 eventHash, bytes32 indexed entrantHash, 
    uint256 indexed eventTicketId, address entrant, address ticketAddress, string eventName, uint256 time);
    event EventStarted(uint256 indexed eventId, uint256 time);
    event EventFinished(uint256 indexed eventId, uint256 time);

    constructor(uint256 _createEventFee, uint256 _entranceFee, address _owner){
      createEventFee = _createEventFee; // .0001 ether
      entranceFee = _entranceFee; // 1 wei
      owner = _owner;
    }

    modifier isOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function createEvent(address _ticketAddress, string calldata _eventName, bool startEvent) external payable returns(uint256){
      require(msg.value > createEventFee, "not enough paid");
      bytes32 _eventHash = keccak256(abi.encode(_ticketAddress,_eventName));
      require(eventExists[_eventHash] != true, 'event already exists');
      uint256 _eventId = eventIdCounter;
      eventHashToEventId[_eventHash] =  _eventId;
      eventExists[_eventHash] = true;
      EventInfo storage _eventInfo = events[_eventId];
      _eventInfo.ticketAddress = _ticketAddress;
      _eventInfo.eventName = _eventName;
      _eventInfo.eventId = _eventId;
      _eventInfo.eventCreator = msg.sender;
      _eventInfo.eventHash = _eventHash;
      eventInProgress[_eventId] = startEvent;
      eventsOwner[_eventId] = msg.sender; 
      emit EventCreated(_eventId, _eventHash, _ticketAddress, _eventName, msg.sender);
      if (startEvent) emit EventStarted(_eventId, block.timestamp);
      ++eventIdCounter;
      return _eventId;
    }

    function enterEvent(address _ticketAddress, string calldata _eventName, uint256 _eventTicketId, uint256 _eventId) external payable returns(bytes32){
      require(msg.value > entranceFee, "not enough paid");
      require(IERC721(_ticketAddress).ownerOf(_eventTicketId) == msg.sender, "You must own the token you are entering with");
      bytes32 _eventHash = keccak256(abi.encode(_ticketAddress,_eventName));
      require(eventExists[_eventHash], "This event does not exist");
      require(eventInProgress[_eventId], "event has not started");
      bytes32 _entrantHash = keccak256(abi.encode(msg.sender,_eventTicketId));
      emit EventEntered(_eventId, _eventHash, _entrantHash, _eventTicketId, msg.sender, _ticketAddress, _eventName, block.timestamp);
      return _entrantHash;
    }

    function changeEventStatus(uint256 _eventId) external {
      require(eventsOwner[_eventId] == msg.sender, "only event owner can call");
      if (eventInProgress[_eventId]) {
        eventInProgress[_eventId] = false;
        emit EventFinished(_eventId, block.timestamp);
      } else {
        eventInProgress[_eventId] = true;
        emit EventStarted(_eventId, block.timestamp);
      }
    }

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function withdraw() isOwner public {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }
    receive() external payable {}
}