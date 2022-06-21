module.exports = function(sequelize, Sequelize) {
    const user = sequelize.define('user', {
        name: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: 'user'
        }
    });
    return user;
}