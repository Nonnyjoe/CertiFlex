// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// import "./EIP712.sol";
import "./ICert.sol";
import "./Certificate2.sol";
import "./Ifactory.sol";
contract UserAccount {

    struct individual{
        string _name;
        address userAddr;
    }
    struct institution{
        string _name;
        address _propietor;
        uint _courseDuration;
        uint certMinted;
    }
    struct receipientDetails {
        string Name;
        address addr;
        uint certificateId;
        string certificateUri;
        uint256 issuedTime;
    }
    address public owner;
    address public NFTaddress;
    address public factory;
    mapping(address => institution)institutionProperties;
    mapping(address => receipientDetails) private Evidence;
    mapping(address => uint) private Nonces;
    mapping(address => bool) issued;
    uint organizationID;

    event Mint (address to, uint id);
    event Revoke(address from, uint id);

    modifier onlyOwner(){
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(string memory name_, address propietor_, uint _duration, uint organizationID_, string memory certSymbol_, address factory_){
        require(propietor_ != address(0), 'non-zero');
        owner = propietor_;
        institutionProperties[owner] = institution(name_,propietor_,_duration, 0);
        Nonces[msg.sender] = 0;
        organizationID = organizationID_;
        Certificate2 certificate = new Certificate2(name_, certSymbol_);
        NFTaddress = address(certificate);
        factory = factory_;
    }
  
    function batchIssueCert(individual[] memory individuals, string memory uri) external onlyOwner {
        for (uint i; i < individuals.length; i++) {
            if (issued[individuals[i].userAddr] != true) {
                issueCertificate(individuals[i]._name, individuals[i].userAddr, uri);
            }
        }
    }

    function issueCertificate(string memory UserName, address userAddr, string memory uri) public onlyOwner {
        require (userAddr != address(0), "Address zero error!");
        require (issued[userAddr] == false, "Already has certificate");
        issued[userAddr] = true;
        uint256 certID = ICert(NFTaddress).safeMint(userAddr, uri);
        Evidence[userAddr] = receipientDetails(UserName, userAddr, certID, uri, block.timestamp);
        bytes memory evidencePointer = abi.encodePacked(userAddr, uri);
        Ifactory(factory).registerCert(userAddr, evidencePointer);
    }

    function RevokeCertificate(address account) external onlyOwner returns (bool){
        ICert(NFTaddress).Burn(Evidence[account].certificateId);
        Evidence[account] = receipientDetails("REVOKED", address(0), 0 ,"revoked", block.timestamp);
        Ifactory(factory).revokeCert(account);
        emit Revoke(account, Evidence[account].certificateId);
        return true;
    }
    function TransferOwnership(address _newOwner) external onlyOwner{
        owner = _newOwner;
    }

    function Institution() view public returns(institution memory) {
        return institutionProperties[owner];
    }
    function id() external view returns(uint){
        return organizationID;
    }
     function nonce() external view returns(uint){
        return Nonces[owner];
    }
}
