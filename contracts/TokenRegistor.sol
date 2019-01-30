pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract TokenRegistor is Ownable {
    using SafeMath for uint256;
    uint constant MAX_LEN = 32;
    uint constant MAX_CNT = 1000000000;

    struct Conversion {
        address fromAddress;
        string id;
    }

    mapping(address => string) public ids;
    Conversion[MAX_CNT] conversionAccts;
    mapping(address => uint) conversionAcctsIndices;
    uint conversionAcctsCnt = 0;

    event LogRegister (address user, string id);

  constructor () public {
  }

  function register(bytes32 id_bytes32) public {

      bytes memory id_array = new bytes(MAX_LEN);

      for (uint i = 0; i < MAX_LEN; i++) {
          id_array[i] = id_bytes32[i];
      }
    string memory id = string(id_array);

    if (keccak256(abi.encodePacked(ids[msg.sender])) == keccak256("")) {
  			Conversion memory conversion = Conversion(msg.sender, id);
            conversionAccts[conversionAcctsCnt] = conversion;
            conversionAcctsIndices[msg.sender] = conversionAcctsCnt;
            conversionAcctsCnt ++;
  		}
  		else {
  			conversionAccts[conversionAcctsIndices[msg.sender]].id = id;
  		}
  		ids[msg.sender] = id;
  		emit LogRegister(msg.sender, id);
  }
  function getConversionLength() onlyOwner public view returns (uint) {
      return conversionAcctsCnt;
  }

  function getConversionAccts(uint index) onlyOwner public view returns
  (address, string) {
    return (conversionAccts[index].fromAddress, conversionAccts[index].id);
  }

}
