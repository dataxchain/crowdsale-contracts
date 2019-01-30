pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

contract TokenDistributor is Ownable {
  uint constant MAX_LEN = 80;
  using SafeMath for uint256;
  using SafeERC20 for ERC20;

  ERC20 public token;

  mapping(bytes => uint256) distributedTx;

  event LogTransferToken(bytes tx_bytes, address beneficiary, uint256 tokenAmount);
  event LogBurnToken(address sender, uint256 tokenAmount);
  event LogGetBackOwnerToken(address owner, uint256 tokenAmount);

  constructor (ERC20 _token) public {
    require(_token != address(0));
    token = _token;
  }

  function transferToken(byte[MAX_LEN] tx_array, address _beneficiary,
    uint256 _tokenAmount) onlyOwner public {

      // 오버플로우를 방지하기 위하여 길이 지정이 가능한 array 형태로 입력 받음
      // array 는 mapping 의 키로 사용할 수 없기 때문에 아래 과정을 거쳐 bytes 형으로 변환
      bytes memory tx_bytes = new bytes(MAX_LEN);
      for (uint i = 0; i < MAX_LEN; i++) {
        tx_bytes[i] = tx_array[i];
      }

      require(distributedTx[tx_bytes] == 0);

      token.safeTransfer(_beneficiary, _tokenAmount);

      distributedTx[tx_bytes] = _tokenAmount;
      emit LogTransferToken(tx_bytes, _beneficiary, _tokenAmount);
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
