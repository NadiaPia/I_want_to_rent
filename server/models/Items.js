

module.exports = (sequelize, DataTypes) => {

    const Items = sequelize.define("Items", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        }
    })

    return Items
}