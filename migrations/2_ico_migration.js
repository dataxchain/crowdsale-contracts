var Token = artifacts.require("./DataXchainToken.sol");
var Distributor = artifacts.require("./TokenDistributor.sol")
var Registor = artifacts.require("./TokenRegistor.sol")

module.exports = function(deployer) {
  deployer.deploy(Token, 1000000000)
  .then(function() {
    return deployer.deploy(
        Distributor
        ,Token.address
      );
  }).then(function() {
    return deployer.deploy(
        Registor
    );
  });
};
