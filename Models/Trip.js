const sequelize = require('sequelize');
const db = require('../Configuration/dbConfiguration');
const Bus = require('../Models/Bus');
const Employee = require('../Models/Employee');
const Ticket = require('../Models/Ticket');

const Trip = db.define('trip', {
        Id: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Is_Active: {
            type: sequelize.Sequelize.BOOLEAN,
        },
        Destination: {
            type: sequelize.Sequelize.STRING,
        },
        Departure: {
            type: sequelize.Sequelize.STRING,
        },
        Departure_Time: {
            type: sequelize.Sequelize.DATE,
        },
        Bus_Id: {
            type: sequelize.Sequelize.INTEGER,
            references: {
                model: 'Buses',
                key: 'Id'
            }
        },
        Driver_Id: {
            type: sequelize.Sequelize.INTEGER,
            references: {
                model: 'Employees',
                key: 'Id'
            }
        },
        Payment: {
            type: sequelize.Sequelize.INTEGER,
        }
    },
    {
        timestamps: false,
        tableName: "Trips"
    });

Trip.associate = (models) => {
    Trip.hasOne(Bus);
    Trip.hasOne(Employee);
    Trip.hasMany(Ticket)
};


module.exports = Trip;