pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

contract DataXchainToken is StandardToken, PausableToken, BurnableToken{
    string public name = "DataXchain";
    string public symbol = "DXCT";
    uint8 public decimals = 18;


    constructor
        (
            uint256 initialBalance
        )
        public
        {
            totalSupply_ = initialBalance * (10 ** uint256(decimals));
            balances[msg.sender] = totalSupply_;


        }
}
