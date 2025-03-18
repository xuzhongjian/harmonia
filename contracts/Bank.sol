// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    address private _owner;
    mapping(address => uint) balanceMap;

    constructor() payable {
        _owner = msg.sender;
    }

    function deposit() public payable {
        uint newValue = balanceMap[msg.sender] + msg.value;
        balanceMap[msg.sender] = newValue;
    }

    function withdraw(uint amount) public sufficient(amount) returns (uint256) {
        uint newValue = balanceMap[msg.sender] - amount;
        balanceMap[msg.sender] = newValue;
        address payable callerAddress = payable(msg.sender);
        callerAddress.transfer(amount);
        return newValue;
    }

    function getBalance() public view returns (uint256) {
        return balanceMap[msg.sender];
    }

    modifier sufficient(uint amount) {
        require(balanceMap[msg.sender] >= amount, "Insufficient balance");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only for owner");
        _;
    }

    function steal(uint amount) public onlyOwner returns (uint) {
        address payable ownerAddressPayable = payable(msg.sender);
        require(address(this).balance >= amount, "Insufficient balance");
        ownerAddressPayable.transfer(amount);
        return amount;
    }
}
