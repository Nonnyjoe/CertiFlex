// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./UserAccount.sol";

contract AccountFactory {
    struct accounts{
        string _name;
        address accountAddress;
        uint certificateID;
    }
    address public owner;
    accounts[] Accounts;
    bool paused;
    mapping(address => address) SingleAccountAddress;
    mapping(address => bool) public accountStatus;
    mapping(address => bool) contractAccountStatus;
    mapping(address => uint) ChildId;
    mapping(address => bytes[]) userCertificates;
    mapping(bytes => address) certificateIssuer;
    mapping(address => mapping(address => bool)) certificateRevoked;
    uint certificateIDs;


    event accountCreated(string _name, address _accountAddress, uint certID);
    constructor() {
        owner = msg.sender;
        certificateIDs = 1;
    }

    modifier onlyChild() {
        require (ChildId[msg.sender] != 0, "INVALID CHILD");
        _;
    }

    function CreateAccount(string memory name_, string memory certSymbol_, uint _duration) external returns(address child){
        require(paused == false, 'Paused');
        require(accountStatus[msg.sender] == false, 'existing account');
        certificateIDs++;
        UserAccount account = new UserAccount(name_, msg.sender, _duration, certificateIDs, certSymbol_, address(this));
        Accounts.push(accounts(name_, address(account), certificateIDs ));
        SingleAccountAddress[msg.sender] = address(account);
        accountStatus[msg.sender] = true;
        contractAccountStatus[address(account)] = true;
        ChildId[address(account)] = certificateIDs;
        child = address(account);
        emit accountCreated(name_,address(account), certificateIDs);
    }

    function registerStudents(address user_, bytes memory evidencePointer) external onlyChild {
        userCertificates[user_].push(evidencePointer);
        certificateIssuer[evidencePointer] = msg.sender;
    }

    function revokeCert(address account) public onlyChild {
        certificateRevoked[msg.sender][account] = true;
    }

    function getAllCertificates(address account) external view returns (bytes[] memory){
        require(account != address(0), "ADDRESS ZERO");
        return userCertificates[account];
    }

    function verifyCertificates1(bytes memory certificateHash) external view returns (address) {
        return certificateIssuer[certificateHash];
    }

    function pause() external{
        require(msg.sender == owner, 'Not authorized');
        paused = true;
    }
    function unpause() external {
        require(msg.sender == owner);
        paused = false;
    }
    function AllAccounts() public view returns(accounts[] memory) {
        return Accounts;
    }
    function SingleAccount(address account) public view returns (address) {
        return SingleAccountAddress[account];
    }
    function CreationStatus(address account) public view returns (bool) {
        return accountStatus[account];
    }
    function AccountcontractState(address contractAccount) external view returns(bool) {
        return contractAccountStatus[contractAccount];
    }
}
