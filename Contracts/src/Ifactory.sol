// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface Ifactory {
    function AccountcontractState(address contractAccount) external view returns(bool);
    function registerStudents(address user, bytes memory uri) external;
    function revokeCert(address account) external;
    function getAllCertificates(address account) external view returns (bytes[] memory);
}