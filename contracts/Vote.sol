// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 一个投票的合约
abstract contract AbstractVote {
    string _name;
    address _owner;

    constructor(string memory name, address owner) {
        _name = name;
        _owner = owner;
    }

    function getName() public view returns (string memory) {
        return _name;
    }

    function openVote() public virtual;

    function vote(address candidate) public virtual;

    function closeVote() public virtual returns (address);

    modifier onlyOwner() {
        if (msg.sender != _owner) {
            revert NotOwner();
        }
        _;
    }

    error NotOwner();
    error HaveVoted(address from);
    error VoteClosed(address from);
    error VoteNotBegin(address from);

    event NewCandidate(address from, address candidate);
    event VoteEvent(address from, address candidate);
}

enum VoteState {
    NotStarted,
    InVoting,
    Ended
}

contract Vote is AbstractVote {
    // 1: not start
    // 2: in voting
    // 3: have end
    VoteState _state = VoteState.NotStarted;
    // save candidate's vote
    mapping(address => uint256) addressToCount;
    // save user's support
    mapping(address => address) voteRecord;
    // save all candidates
    address[] public candidates;

    constructor(string memory name) AbstractVote(name, msg.sender) {}

    function vote(address candidate) public override voteCheck {
        addressToCount[candidate]++;
        voteRecord[msg.sender] = candidate;

        uint256 count = addressToCount[candidate];
        if (count == 1) {
            candidates.push(candidate);
            emit NewCandidate(msg.sender, candidate);
        }
        emit VoteEvent(msg.sender, candidate);
    }

    function closeVote() public override onlyOwner returns (address) {
        _state = VoteState.Ended;
        if (candidates.length == 0) {
            return address(0);
        }
        address result = address(0);
        uint256 max = 0;
        for (uint i = 0; i < candidates.length; i++) {
            address curCandidate = candidates[i];
            uint256 curScore = addressToCount[curCandidate];
            if (curScore > max) {
                result = curCandidate;
                max = curScore;
            }
        }
        return result;
    }

    function openVote() public override onlyOwner {
        _state = VoteState.NotStarted;
    }

    modifier voteCheck() {
        address caller = msg.sender;
        if (_state == VoteState.NotStarted) {
            revert VoteNotBegin(caller);
        }
        if (_state == VoteState.Ended) {
            revert VoteClosed(caller);
        }
        if (voteRecord[caller] != address(0)) {
            revert HaveVoted(caller);
        }
        _;
    }
}
