// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/**
 * @title DamnValuableNFT
 * @author Damn Vulnerable DeFi (https://damnvulnerabledefi.xyz)
 * @notice Implementation of a mintable and burnable NFT with role-based access controls
 */
contract BasicNFT is ERC721, ERC721Burnable {
    uint256 public tokenIdCounter;

    constructor() ERC721("BasicNFT", "BASIC") {
    }

    function safeMint(address to) public returns (uint256 tokenId) {
        tokenId = tokenIdCounter;
        _safeMint(to, tokenId);
        ++tokenIdCounter;
    }
}