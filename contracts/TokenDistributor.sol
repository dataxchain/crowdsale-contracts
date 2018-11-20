pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

contract TokenDistributor is Ownable {
  using SafeMath for uint256;
  using SafeERC20 for ERC20;

  ERC20 public token;

  mapping(string => uint256) distributedTx;
  bool isInitialDistributed = false;

  event LogTransferToken(string tx, address beneficiary, uint256 tokenAmount);
  event LogBurnToken(address sender, uint256 tokenAmount);
  event LogGetBackOwnerToken(address owner, uint256 tokenAmount);

  constructor (ERC20 _token) public {
    require(_token != address(0));
    token = _token;
  }

  function transferToken(string _tx, address _beneficiary,
    uint256 _tokenAmount) onlyOwner public {
      require(distributedTx[_tx] == 0);

      token.safeTransfer(_beneficiary, _tokenAmount);

      distributedTx[_tx] = _tokenAmount;
      emit LogTransferToken(_tx, _beneficiary, _tokenAmount);
  }

  function burnToken() onlyOwner public {
    BurnableToken(token).burn(token.balanceOf(address(this)));
    emit LogBurnToken(address(this), token.balanceOf(address(this)));
  }

  function getBackOwnerToken() onlyOwner public {
    token.safeTransfer(msg.sender, token.balanceOf(address(this)));
    emit LogGetBackOwnerToken(msg.sender, token.balanceOf(address(this)));
  }

}
