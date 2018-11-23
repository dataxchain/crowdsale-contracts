const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION);

 const Distribution = sequelize.define('distribution', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hash: Sequelize.STRING,
    addr: Sequelize.STRING,
    amount: Sequelize.STRING,
    is_distributed: Sequelize.BOOLEAN
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Distribution;
