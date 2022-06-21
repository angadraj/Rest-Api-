module.exports = function(sequelize, Sequelize) {
    const tutorials = sequelize.define('tutorials', {
        title: {
            type: Sequelize.STRING
        }, 
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });
    return tutorials;
}