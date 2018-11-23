const artifacts = require("../build/contracts/TokenDistributor.json");

const contract = require("truffle-contract");
const Distributor = contract(artifacts);

const DistributionTable = require('./sequelize_db');

module.exports = async function(callback) {
    var query_result = await DistributionTable.findAll({
        attributes: ['hash', 'addr', 'amount', 'is_distributed'],
        where: { is_distributed: false }
    });

    Distributor.setProvider(web3.currentProvider);
    var distributor = await Distributor.deployed();
    var owner = await distributor.owner();
    Distributor.defaults({from: owner});

    query_result.forEach((row) => {
        distributor.transferToken(row.hash, row.addr, web3.toWei(row.amount))
            .then(tx_res => {
                console.log("success : " + tx_res.tx);
                DistributionTable.update(
                    { is_distributed: true}, { where: { hash: row.hash } });
            })
            .catch(error => {
                console.log("error : " + error);
            });
    });
};
