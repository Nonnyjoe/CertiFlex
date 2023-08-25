// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/AccountFactory.sol";

contract deployScript is Script {
    AccountFactory public factory;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        // uint256 deployerPrivateKey2 = vm.envUint("PRIVATE_KEY2");
        vm.startBroadcast(deployerPrivateKey);
        factory = new AccountFactory();   

    }
}
