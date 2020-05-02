const sequelize = require('sequelize');
const db = require('../Configuration/dbConfiguration');


const Manager = db.define('manager', {
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
        Surname: {
            type: sequelize.Sequelize.STRING,
        },
        Password: {
            type: sequelize.Sequelize.STRING,
        }
    },
    {
        timestamps: false,
        tableName: "Managers"
    });
module.exports = Manager;