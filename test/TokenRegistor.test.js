var TokenRegistor = artifacts.require("TokenRegistor");

const tryCatch = require("./exceptions.js").tryCatch;
const errTypes = require("./exceptions.js").errTypes;

contract('TokenRegistor', async (accounts) => {
  let registor;

  var registorUser1 = accounts[1];
  var registorUser2 = accounts[2];
  var registorUser3 = accounts[3];

  it("make contract", async() => {
    registor = await TokenRegistor.new();
  });

  describe('test registor method', async() =>{
    var user1id = 'user1';
    var user2id = 'user2';
    var user3id = 'user3';

    describe('register user id', async() =>{
      it("register user1 id", async() => {
        await registor.register(user1id, {from: registorUser1});
        let id = await registor.ids.call(registorUser1);
        assert.equal(id, user1id);
      });

      it("register user2 id", async() => {
        await registor.register(user2id, {from: registorUser2});
        id = await registor.ids.call(registorUser2);
        assert.equal(id, user2id);
      });

      it("register user3 id", async() => {
        await registor.register(user3id, {from: registorUser3});
        id = await registor.ids.call(registorUser3);
        assert.equal(id, user3id);
      });

      describe('get conversion accts test', async() =>{
        it("getConversionLength is three", async() => {
          let length = await registor.getConversionLength()
          assert.equal(length.valueOf(), 3);
        });

        it("getConversionAccts", async() => {

          let account = await registor.getConversionAccts(0);
          assert.equal(account[0], registorUser1);
          assert.equal(account[1], user1id);

          account = await registor.getConversionAccts(1);
          assert.equal(account[0], registorUser2);
          assert.equal(account[1], user2id);

          account = await registor.getConversionAccts(2);
          assert.equal(account[0], registorUser3);
          assert.equal(account[1], user3id);
        });
      });
    });
  });

  describe('test change registor method', async() =>{
    var user1id = 'user100';
    var user2id = 'user2';
    var user3id = 'user300';

    describe('change user id from user1 to user100', async() =>{
      it("change user1 id", async() => {
        await registor.register(user1id, {from: registorUser1});
        let id = await registor.ids.call(registorUser1);
        assert.equal(id, user1id);
      });

      it("change user3 id from user3 to user300", async() => {
        await registor.register(user3id, {from: registorUser3});
        id = await registor.ids.call(registorUser3);
        assert.equal(id, user3id);
      });

      describe('get conversion accts test', async() =>{
        it("getgetConversionLength is three", async() => {
          let length = await registor.getConversionLength()
          assert.equal(length.valueOf(), 3);
        });

        it("getConversionAccts", async() => {

          let account = await registor.getConversionAccts(0);
          assert.equal(account[0], registorUser1);
          assert.equal(account[1], user1id);

          account = await registor.getConversionAccts(1);
          assert.equal(account[0], registorUser2);
          assert.equal(account[1], user2id);

          account = await registor.getConversionAccts(2);
          assert.equal(account[0], registorUser3);
          assert.equal(account[1], user3id);
        });
      });
    });
  });

});
