const sequelize = require('sequelize');
const db = require('../Configuration/dbConfiguration');
const Ticket = require('../Models/Ticket');

const User = db.define('user', {
        Id: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: sequelize.Sequelize.STRING,
            unique: true,
        },
        Real_Name: {
            type: sequelize.Sequelize.STRING,
        },
        Surname:{
            type: sequelize.Sequelize.STRING,
        },
        Password: {
            type: sequelize.Sequelize.STRING,
        },
        Money: {
            type: sequelize.Sequelize.INTEGER,
        }
    },
    {
        timestamps: false,
        tableName: "Users"
    });

User.associate = (models) => {
    User.hasMany(Ticket);
};

module.exports = User;