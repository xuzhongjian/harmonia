//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint i;

    constructor(){
        
        i = 0;
    }

    function get() public view returns (uint){
        return i;
    }

    function add(uint m) public {
        i = i + m;
    }

    function subtract(uint m) public {
        i = i - m;
    }
}