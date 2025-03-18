pragma solidity ^0.8.0;

contract Hello {
    address private _owner;
    constructor() {
        _owner = msg.sender;
    }

    function sayHi() public onlyOwner view returns (uint)  {
        return 10;
    }

    function owner() private view returns (address) {
        return _owner;
    }

    modifier onlyOwner {
        require(msg.sender == owner(), "Only owner can call this function.");
        _;
    }
}

contract HelloCreator {
    uint public x;
    Hello public h;

    function createHello() public returns (address) {
        // 新合约的 owner 是 HelloCreator 这个合约，而不是 HelloCreator 的 owner
        h = new Hello();
        return address(h);
    }
}