const Token = artifacts.require("./DataXchainToken.sol");
const Distributor = artifacts.require("./TokenDistributor.sol");
const Registor = artifacts.require("./TokenRegistor.sol");

const total_amount = web3.toWei("1000000000");
const member_amount = web3.toWei("100000000");
const foundation_amount = web3.toWei("150000000");
const sale_amount = total_amount - member_amount - foundation_amount;

const member_addr = process.env.MEMBER_ADDR;
const foundation_addr = process.env.FOUNDATION_ADDR;

module.exports = function(deployer, network, accounts) {
  return deployer.then(() => {
      return deployer.deploy(Token, total_amount);
  }).then(() => {
      return deployer.deploy(Distributor, Token.address);
  }).then(() => {
      return Distributor.deployed();
  }).then(async(distributor) => {
      let token = await Token.at(Token.address);
      await token.transfer(member_addr, member_amount);
      await token.transfer(foundation_addr, foundation_amount);
      await token.transfer(distributor.address, sale_amount);
  }).then(() => {
      return deployer.deploy(Registor);
  }).catch(error => console.error({ error }));
};