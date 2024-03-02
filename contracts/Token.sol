// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

contract Token {

    uint256 public constant decimals = 18;
    string public name;
    string public symbol;
    address public owner;
    uint256 public totalSupply;

    mapping (address => uint256) public balances;

    event Approval(address indexed src, address indexed usr, uint256 wad);
    event Transfer(address indexed src, address indexed dst, uint256 wad);

    constructor(string memory _symbol, string memory _name) {
        symbol = _symbol;
        name = _name;
        owner = msg.sender;
    }

    function transfer(address dst, uint256 wad) external returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(address src, address dst, uint256 wad) public returns (bool) {
        require(balances[src] >= wad, "insufficient balance");
        balances[src] = balances[src] - wad;
        balances[dst] = balances[dst] + wad;
        emit Transfer(src, dst, wad);
        return true;
    }

    function mint(address usr, uint256 wad) public {
        require(owner == msg.sender, "only owner can mint");
        balances[usr] = balances[usr] + wad;
        totalSupply = totalSupply + wad;
        emit Transfer(address(0), usr, wad);
    }
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
}