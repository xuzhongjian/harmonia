// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Ticket {
    uint256 start;
    uint256 end;
    uint256 count;
    uint256 amount;
    uint256 timestamp;
}

enum LotteryState {
    NotBegin,
    InSale,
    WaitToOpen,
    WaitToClaim
}

contract Lottery {
    string _name;
    uint256 _price;
    address _owner;
    LotteryState _state;

    constructor(string memory name, uint256 price) {
        _name = name;
        _price = price;
        _owner = msg.sender;
        _state = LotteryState.NotBegin;
    }

    function startSale() public onlyOwner {
        _state = LotteryState.InSale;
    }

    function getPrice() public view returns (uint256) {
        return _price;
    }

    function getTotalAmount() public view returns (uint256) {
        return _totalAmount;
    }

    function getTotalTickets() public view returns (uint256) {
        return _totalTickets;
    }

    uint256 _totalAmount;
    uint256 _totalTickets;

    mapping(address => mapping(uint16 => Ticket)) _holderMap;
    mapping(address => uint16) _indexMap;
    mapping(uint256 => address) _ticketMap;
    address[] _holders;

    function buy() public payable needInSale {
        uint256 amount = msg.value;
        address caller = msg.sender;
        uint256 newTicketsCount = amount / _price;
        Ticket memory newTicket = Ticket(
            _totalTickets + 1,
            _totalTickets + newTicketsCount,
            amount,
            newTicketsCount,
            block.timestamp
        );
        _holderMap[caller][_indexMap[caller]] = newTicket;
        _indexMap[caller]++;
        _totalAmount += amount;
        _totalTickets += newTicketsCount;

        setTicketToHolderMap(newTicket.start, newTicket.end, caller);
        emit Buy(caller, amount, newTicketsCount);
    }

    function setTicketToHolderMap(
        uint256 start,
        uint256 end,
        address caller
    ) private {
        for (uint i = start; i < end; i++) {
            _ticketMap[i] = caller;
        }
    }

    function getTickets() public view needBegin returns (Ticket[] memory) {
        address caller = msg.sender;
        uint16 ticketsCount = _indexMap[caller];
        if (ticketsCount == 0) {
            revert NoTicketError(caller);
        }

        Ticket[] memory tickets = new Ticket[](ticketsCount);
        for (uint16 i = 0; i < ticketsCount; i++) {
            tickets[i] = _holderMap[caller][i];
        }
        return tickets;
    }

    function getTicketCount() public view needBegin returns (uint256) {
        address caller = msg.sender;
        uint16 ticketsCount = _indexMap[caller];
        if (ticketsCount == 0) {
            revert NoTicketError(caller);
        }

        uint256 result = 0;
        for (uint16 i = 0; i < ticketsCount; i++) {
            Ticket memory cur = _holderMap[caller][i];
            result += cur.count;
        }
        return result;
    }

    function getTicketOwner(
        uint256 ticketNumber
    ) public view needBegin returns (address) {
        return _ticketMap[ticketNumber];
    }

    event Buy(address caller, uint256 amount, uint256 tickets);
    error NoTicketError(address caller);
    error OnlyOwnerError(address caller);
    error NotOpen(LotteryState currentState);
    error NotInSale(LotteryState currentState);

    modifier onlyOwner() {
        if (msg.sender == _owner) {
            revert OnlyOwnerError(msg.sender);
        }
        _;
    }

    modifier needBegin() {
        if (_state == LotteryState.NotBegin) {
            revert NotOpen(_state);
        }
        _;
    }

    modifier needInSale() {
        if (_state != LotteryState.InSale) {
            revert NotInSale(_state);
        }
        _;
    }
}
