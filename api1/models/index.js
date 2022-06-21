const dbConfig = require('../config/dbConfig');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;
// catch your models here
db.tutorials = require('./tutorialModel')(sequelize, Sequelize);
db.user = require('./userModel')(sequelize, Sequelize);

db.sequelize.sync({force: false}, function() {
    console.log("drop and resync db");
});
module.exports = db;