// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hello {
    address private _owner;

    constructor() payable {
        _owner = msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender == _owner, "only for owner");
        _;
    }

    function sayHello() public onlyOwner view returns (uint){
        return 108;
    }
}

contract HelloCreator {
    uint public x;
    Hello public h;

    address private _owner;

    constructor() payable {
        _owner = msg.sender;
    }

    function createHello() public returns (address) {
        // 新合约的 owner 是 HelloCreator 这个合约，而不是 HelloCreator 的 owner
        h = new Hello();
        return address(h);
    }
}