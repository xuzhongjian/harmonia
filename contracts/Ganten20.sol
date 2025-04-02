// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ganten20 is Context, IERC20, IERC20Metadata, IERC20Errors {
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        _totalSupply = 1_000_000_000;
    }

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _approve;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(
        address account
    ) external view override returns (uint256) {
        return _balances[account];
    }

    function transfer(
        address to,
        uint256 value
    ) external override returns (bool) {}

    /**
     * 外部方法
     * 获取 spender 可以在 owner 处被授权花费的数量
     * @param owner 授权方
     * @param spender 被授权方
     */
    function allowance(
        address owner,
        address spender
    ) external view override returns (uint256) {
        return _approve[owner][spender];
    }

    /**
     * 外部方法
     * 调用者向 spender 授权，最多可以花费 value 的数量的金额
     * @param spender 被授权方
     * @param value 数量
     */
    function approve(
        address spender,
        uint256 value
    ) external override returns (bool) {
        uint256 caller_balance = _balances[msg.sender];
        if (caller_balance < value) {
            revert ERC20InsufficientBalance(msg.sender, caller_balance, value);
        }
        _approve[msg.sender][spender] = value;
        return true;
    }

    /**
     * 外部方法
     * 调用者将 from 地址的金额，数量为 value ，将其转账到 to 地址。
     * 条件是前面有被授权足够的数量。
     * @param from 发送地址/授权地址
     * @param to 接收地址
     * @param value 数量
     */
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external override returns (bool) {
        uint256 available = _approve[from][msg.sender];
        if (available < value) {
            revert ERC20InsufficientBalance(from, available, value);
        }
        _transfer(from, to, value);
        return true;
    }

    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    function decimals() external pure override returns (uint8) {
        return 18;
    }

    function _mint(address account, uint256 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _transfer(address(0), account, value);
    }

    function _burn(address account, uint256 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        _transfer(account, address(0), value);
    }

    function _transfer(address from, address to, uint256 value) internal {
        if (from == address(0)) {
            _totalSupply += value;
        } else {
            _balances[from] -= value;
        }
        if (to == address(0)) {
            _totalSupply -= value;
        } else {
            _balances[to] -= value;
        }
        emit Transfer(from, to, value);
    }
}
