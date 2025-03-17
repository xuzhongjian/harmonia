//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CallerAddress {

    constructor(){
    }

    function getCallerAddress() public view returns (address) {
        return msg.sender;
    }
}
