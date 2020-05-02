const sequelize = require('sequelize');
const db = require('../Configuration/dbConfiguration');
const Trip = require('../Models/Trip');

const Employee = db.define('employee', {
        Id: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: sequelize.Sequelize.STRING,
        },
        Surname: {
            type: sequelize.Sequelize.STRING,
        },
        Address: {
            type: sequelize.Sequelize.STRING,
        },
    },
    {
        timestamps: false,
        tableName: "Employees"
    });

Employee.associate = (models) => {
    Employee.hasMany(Trip);
};

module.exports = Employee;