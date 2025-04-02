// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Toy {
    uint public modelNumber;

    constructor(uint _modelNumber) {
        modelNumber = _modelNumber;
    }
}

contract ToyFactory {
    event ToyCreated(address toyAddress);

    function createToy(uint _modelNumber, bytes32 _salt) public {
        Toy toy = new Toy{salt: _salt}(_modelNumber);
        emit ToyCreated(address(toy));
    }
}