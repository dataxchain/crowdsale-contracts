const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION);

 const Distribution = sequelize.define('DISTRIBUTION', {
    HASH: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    ADDR: Sequelize.STRING,
    AMOUNT: Sequelize.STRING,
    IS_DISTRIBUTED: Sequelize.BOOLEAN
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Distribution;
