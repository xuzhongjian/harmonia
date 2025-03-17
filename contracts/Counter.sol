//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint count;
    constructor(){
        count = 0;
    }

    function add(uint n) public {
        count = count + n;
    }

    function subtract(uint n) public {
        count = count - n;
    }

    function get() public view returns (uint){
        return count;
    }
}