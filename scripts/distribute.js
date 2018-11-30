const artifacts = require("../build/contracts/TokenDistributor.json");

const contract = require("truffle-contract");
const Distributor = contract(artifacts);

const DistributionTable = require('./sequelize_db');

module.exports = async function(callback) {
    var query_result = await DistributionTable.findAll({
        attributes: ['HASH', 'ADDR', 'AMOUNT', 'IS_DISTRIBUTED'],
        where: { IS_DISTRIBUTED: false }
    });

    Distributor.setProvider(web3.currentProvider);
    var distributor = await Distributor.deployed();
    var owner = await distributor.owner();
    Distributor.defaults({from: owner});

    for (const row of query_result) {
        await console.debug(row.HASH, row.ADDR, web3.toWei(row.AMOUNT));
        try {
            let tx_res = await distributor.transferToken(
                row.HASH, row.ADDR, web3.toWei(row.AMOUNT));
            await console.log("success : " + tx_res.tx);
            await DistributionTable.update(
                { IS_DISTRIBUTED: true}, { where: { HASH: row.HASH } });

        } catch (error) {
            console.log("error : " + error);
        }
    }

    return callback();
};
