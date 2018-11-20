var DataXchainToken = artifacts.require("DataXchainToken");
var TokenDistributor = artifacts.require("TokenDistributor");

const tryCatch = require("./exceptions.js").tryCatch;
const errTypes = require("./exceptions.js").errTypes;

contract('TokenDistributor', async (accounts) => {
  var owner = accounts[0];
  var notOwner = accounts[9];
  var purchaser = accounts[1];
  var memberAndAdvisorAddress = accounts[7];
  var reserveAddress = accounts[8];
  var createAmount = 5000000000;
  var saleAmount = 2750000000 * (10 ** 18);
  var bountyAndAirdropAmount = 250000000 * (10 ** 18);
  var memberAndAdvisorAmount = 500000000 * (10 ** 18);
  var reserveTokenAmount = 1500000000 * (10 ** 18);

  let token;
  let distributor;

  it("make contract", async() => {

    token = await DataXchainToken.new(5000000000);
    distributor = await TokenDistributor.new(token.address);
  });

  it("transfer token to distributor", async() => {
    await token.transfer(distributor.address, createAmount * (10 ** 18),
     {from: owner});
    let balance = await token.balanceOf.call(distributor.address);
    assert.equal(balance.valueOf(), createAmount * (10 ** 18));
  });

  describe('test transferToken method', async() =>{
    var hash = '0x1234';
    var amount = 25000;

    it("transfer token with hash from notOwner", async() => {
      await tryCatch(distributor.transferToken(
          hash, purchaser, amount, {from:notOwner}), errTypes.revert);
    });

    it("transfer token with hash from Owner", async() => {
      await distributor.transferToken(hash, purchaser, amount, {from:owner});
      let balance = await token.balanceOf.call(purchaser);
      assert.equal(balance.valueOf(), amount);
    });

    it("transfer token with hash twice", async() => {
      await tryCatch(distributor.transferToken(
          hash, purchaser, amount, {from:owner}), errTypes.revert);
    });
  });

  describe('test getBackOwnerToken method', async() => {

    it("get back OwnerToken from notOwner", async() => {
      await tryCatch(distributor.getBackOwnerToken({from:notOwner}), errTypes.revert);
    });

    describe('getBackOwnerToken from owner', async() => {
      let balance;
      it("get distributor current token amount", async() => {
        balance = await token.balanceOf.call(distributor.address);
      });

      it("get back OwnerToken from owner", async() => {
        tryCatch(await distributor.getBackOwnerToken({from:owner}));
      });

      it("check ownertoken get back", async() => {
        let ownerBalance = await token.balanceOf.call(owner);
        assert.equal(balance.valueOf(), ownerBalance.valueOf());
      });

      it("return token to distributor", async() => {
        await token.transfer(distributor.address, balance.valueOf());
      });
    });
  });

  describe('test burnToken method', async() => {
    it("burnToken, distributor token amount is zero", async() => {
      distributor.burnToken();
      let balance = await token.balanceOf.call(distributor.address);
      assert.equal(balance.valueOf(), 0);
    });

  });

});
