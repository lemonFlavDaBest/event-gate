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
      address eventAddress;
      string eventName;
      uint256 eventId;
      address eventCreator;
      bytes32 eventHash;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _eventIdCounter;
    uint256 public enterCost;
    uint256 public eventCost;
    mapping(uint256 => EventInfo) public events;
    mapping(bytes32 => uint256) public eventHashToEventId;
    mapping(bytes32 => bool) public eventExists;

    constructor() {}

    receive() external payable {}
}