pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract TokenRegistor is Ownable {
  using SafeMath for uint256;

  struct Conversion {
    address fromAddress;
    string id;
  }

  mapping(address => string) public ids;
  Conversion[] conversionAccts;
  mapping(address => uint) conversionAcctsIndices;

  event LogRegister (address user, string id);

  constructor () public {
  }

  function register(string id) public {
    if (keccak256(abi.encodePacked(ids[msg.sender])) == keccak256("")) {
  			Conversion memory conversion = Conversion(msg.sender, id);
  			conversionAcctsIndices[msg.sender] = conversionAccts.push(conversion) - 1;
  		}
  		else {
  			conversionAccts[conversionAcctsIndices[msg.sender]].id = id;
  		}
  		ids[msg.sender] = id;
  		emit LogRegister(msg.sender, id);
  }

  function getConversionLength() onlyOwner public view returns (uint) {
    return conversionAccts.length;
  }

  function getConversionAccts(uint index) onlyOwner public view returns
  (address, string) {
    return (conversionAccts[index].fromAddress, conversionAccts[index].id);
  }

}
