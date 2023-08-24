// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
    struct receipientDetails {
        string Name;
        address addr;
        uint certificateId;
        string certificateUri;
        uint256 issuedTime;
    }
    
interface IUserAccount {
    function issueCertificate(string memory UserName, address userAddr, string memory uri) external; 
    function RevokeCertificate(address account) external;    
    function verifyCertificate(bytes memory encodedCert) external returns (receipientDetails memory);
}