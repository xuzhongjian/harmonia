// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CallerAddress {

    // 通过给合约注入一些以太币来确保有余额
    constructor() payable {}

    function getCallerAddress() public view returns (address) {
        return msg.sender;
    }

    function transferToCaller() public {
        address payable callerAddress = payable(msg.sender);
        uint amount = 100 ether;

        // 确保合约中有足够余额
        require(address(this).balance >= amount, "Insufficient balance in the contract");

        callerAddress.transfer(amount);
    }

    // 获取合约余额
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
