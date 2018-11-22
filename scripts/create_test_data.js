const Distribution = require('./sequelize_db');

Distribution.bulkCreate([
    {hash: "txaa", addr: "0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e",
        amount: 100, is_distributed: false},
    {hash: "txbb", addr: "0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5",
        amount: 200, is_distributed: false},
    {hash: "txcc", addr: "0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5",
        amount: 300, is_distributed: true},
    {hash: "txdd", addr: "0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5",
        amount: 400, is_distributed: false},
]).then(() => {
    return Distribution.findAll();
}).then(distributions => {
    console.log(distributions);
});