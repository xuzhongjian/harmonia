//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CallerAddress {

    uint constant one_eth = 1000000000000000000;

    constructor(){
    }

    function getCallerAddress() public view returns (address) {
        return msg.sender;
    }

    function transferToCaller() public {
        address callerAddress = msg.sender;
        callerAddress.transfer(one_eth * 100);
    }
}
