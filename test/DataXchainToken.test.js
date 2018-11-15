var DataXchainToken = artifacts.require("DataXchainToken");

const tryCatch = require("./exceptions.js").tryCatch;
const errTypes = require("./exceptions.js").errTypes;

contract('DataXchainToken', async (accounts) => {
  let token;
  var owner = accounts[0];
  var notOwner = accounts[9];
  var receiver = accounts[1];
  var receiver2 = accounts[2];
  var testAmount = 25000 * (10 ** 18);
  it("make contract", async() => {
    token = await DataXchainToken.new(5000000000);
  });

  it("transfer token to reciever", async() => {
    await token.transfer(receiver, testAmount, {from: owner});
    let balance = await token.balanceOf.call(receiver);
    assert.equal(balance.valueOf(), testAmount);
  });

  describe('test pause method', async() =>{

    it("execute pause from notOwner", async() => {
      await tryCatch(token.pause({from: notOwner}), errTypes.revert);
    });

    it("execute pause from owner", async() => {
      await token.pause({from: owner});
    });

    it("transfer token to reciver but transfer method is paused", async() => {
      await tryCatch(token.transfer(receiver, testAmount, {from: owner}), errTypes.revert);
    });

    it("transfer token from reciver to reciever2 but transfer method is paused", async() => {
      await tryCatch(token.transfer(receiver2, testAmount, {from: receiver}), errTypes.revert);
    });
  });

  describe('test unpause method', async() =>{

    it("execute unpause from owner", async() => {
      await token.unpause({from: owner});
    });

    it("transfer token to reciver", async() => {
      await token.transfer(receiver, testAmount, {from: owner});
    });

  });

});
