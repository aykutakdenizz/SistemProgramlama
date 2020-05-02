const sequelize = require('sequelize');
const db = require('../Configuration/dbConfiguration');
const  Trip = require('../Models/Trip');

const Bus = db.define('bus', {
        Id: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Plate: {
            type: sequelize.Sequelize.STRING,
        },
        Seat_Plan: {
            type: sequelize.Sequelize.STRING,
        },
        Empty_Seats:{
            type: sequelize.Sequelize.ARRAY(sequelize.Sequelize.STRING),
        }
    },
    {
        timestamps: false,
        tableName: "Buses"
    });

Bus.associate = (models) => {
    Bus.hasOne(Trip);
};

module.exports = Bus;