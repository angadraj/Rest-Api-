module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define('posts', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            defaultValue: ""
        }
    });
    return Post;
}