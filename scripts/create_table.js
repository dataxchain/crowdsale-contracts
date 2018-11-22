const Distribution  = require('./sequelize_db');

Distribution.sync()
    .then(() => {
        console.log('table created');
    });
