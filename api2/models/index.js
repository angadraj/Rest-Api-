const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
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

// get your models here
db.User = require('./userModel')(sequelize, DataTypes);
db.Post = require('./postModel')(sequelize, DataTypes);

// associations

// one user has many posts
db.User.hasMany(db.Post, {
    foreignKey: {
        as: 'UserPosts',
        allowNull: false,
        name: 'userId'
    }
});
db.Post.belongsTo(db.User);

db.sequelize.sync({ alter: true }, function() {
    console.log('db sycned');
});

module.exports = db;