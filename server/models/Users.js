module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    })

    Users.associate = (models) => { //that means Items table will contain UserId
        Users.hasMany(models.Items, {
           onDelete: "cascade",
        });
    }

    return Users;
}