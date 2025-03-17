//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint counter;

    constructor() {
        counter = 0;
    }

    function count() public {
        counter = counter + 1;
    }

    function add(uint n) public {
        counter = counter + n;
    }

    function subtract(uint n) public {
        counter = counter - n;
    }

    function get() public view returns (uint) {
        return counter;
    }
}