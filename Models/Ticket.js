const sequelize = require('sequelize');
const db = require('../Configuration/dbConfiguration');
const User = require('../Models/User');
const Trip = require('../Models/Trip');


const Ticket = db.define('ticket', {
        Id: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Trip_Id: {
            type: sequelize.Sequelize.INTEGER,
            references: {
                model: 'Trips',
                key: 'Id'
            }
        },
        Seat: {
            type: sequelize.Sequelize.STRING,
        },
        User_Id: {
            type: sequelize.Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'Id'
            }
        }
    },
    {
        timestamps: false,
        tableName: "Tickets"
    });

Ticket.associate = (models) => {
    Ticket.hasOne(User);
    Ticket.hasOne(Trip);
};
module.exports = Ticket;