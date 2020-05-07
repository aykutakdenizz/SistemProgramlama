const Employee = require('../Models/Employee');

exports.addEmployee = (req, res, next) => {
    if (req.body.Name == null || req.body.Surname == null ) {
        return res.status(404).json({
            Error: 'Values/Value missing when adding employee!'
        });
    }
    const newEmployee = new Employee({
        Name: req.body.Name,
        Surname: req.body.Surname,
        Address: req.body.Address,
    });
    newEmployee.save(newEmployee).then(employee => {
        res.status(201).json({
            Employee: employee
        })
    }).catch(err => {
        res.status(500).json({
            Error: 'Employee can not added !! => ERR:' + err
        });
    });
};
exports.deleteEmployee = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when deleting employee!'
        });
    }
    Employee.destroy({
        where: {
            Id: req.body.Id
        }
    }).then(response => {
        res.status(200).json({
            Employee: response
        })
    }).catch(err => {
        res.status(500).json({
            Error: 'Employee can not deleted !! => ERR:' + err
        });
    });
};
exports.updateEmployee = (req, res, next) => {
    if ( req.body.Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when updating employee!'
        });
    }
    Employee.update({
            Name: req.body.Name,
            Surname: req.body.Surname,
            Address: req.body.Address
        },
        {
            where: {
                Id: req.body.Id
            }
        }
    ).then(result => {
            if (result[0]===1) {
                return res.status(200).json({
                    Employee: {
                        Id: req.body.Id,
                        Name: req.body.Name,
                        Surname: req.body.Surname,
                        Address: req.body.Address
                    }
                })
            }
            else{
                return res.status(200).json({
                    Bus: null
                });
            }
        }
    ).catch(err => {
        res.status(500).json({
            Error: 'Employee can not updated !! => ERR:' + err
        });
    });
};
exports.findEmployee = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when finding employee!'
        });
    }
    Employee.findOne({
        where: {
            Id: req.body.Id,
        }
    }).then(result =>
        res.status(200).json({
            Employee: result
        })
    ).catch(err => {
        res.status(500).json({
            Error: 'Employee can not find !! => ERR:' + err
        });
    });
};
exports.getEmployees = (req, res, next) => {
    Employee.findAll()
        .then(result => {
            res.status(200).json({
                Employee: result
            })
        })
        .catch(err => {
            res.status(500).json({
                Error: 'Employees can not find !! => ERR:' + err
            });
        });
};
