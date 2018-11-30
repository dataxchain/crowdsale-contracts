const Distribution = require('./sequelize_db');

Distribution.bulkCreate([
    {HASH: "txaa", ADDR: "0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e",
        AMOUNT: 100, IS_DISTRIBUTED: false},
    {HASH: "txbb", ADDR: "0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5",
        AMOUNT: 200, IS_DISTRIBUTED: false},
    {HASH: "txcc", ADDR: "0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5",
        AMOUNT: 300, IS_DISTRIBUTED: true},
    {HASH: "txdd", ADDR: "0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5",
        AMOUNT: 400, IS_DISTRIBUTED: false},
]).then(() => {
    return Distribution.findAll();
}).then(distributions => {
    console.log(distributions);
});