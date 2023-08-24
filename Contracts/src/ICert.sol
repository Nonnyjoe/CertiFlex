// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface ICert {
    function Burn(uint id) external;
    function safeMint(address to, string memory uri) external returns (uint256);
}
