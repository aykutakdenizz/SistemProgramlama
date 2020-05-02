const Manager = require('../Models/Manager');
const bcrypt = require('bcryptjs');

exports.deleteManager = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Message: 'Values/Value missing when manager deleting!'
        });
    }
    Manager.destroy({
        where: {
            Id: req.body.Id
        }
    }).then(response => {
        res.status(200).json({
            Manager: response
        })
    }).catch(err => {
        res.status(500).json({
            Error: 'Manager can not deleted !! => ERR:' + err
        });
    });
};
exports.updateManager = (req, res, next) => {
    if (req.body.Name == null || req.body.Password == null || req.body.Real_Name == null || req.body.Surname == null || req.body.Id == null) {
        return res.status(404).json({
            Message: 'Values/Value missing when manager updating!'
        });
    }
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        if (!err) {
            Manager.update({
                    Name: req.body.Name,
                    Password: hash,
                    Real_Name: req.body.Real_Name,
                    Surname: req.body.Surname,
                },
                {
                    where: {
                        Id: req.body.Id
                    }
                }
            ).then(result => {
                    if (result[0] === 1) {
                        return res.status(200).json({
                            Manager: {
                                Id: req.body.Id,
                                Name: req.body.Name,
                                Password: hash,
                                Real_Name: req.body.Real_Name,
                                Surname: req.body.Surname,
                            }
                        });
                    } else {
                        return res.status(200).json({
                            Manager: null
                        });
                    }
                }
            ).catch(err => {
                res.status(500).json({
                    Error: 'Manager can not updated !! => ERR:' + err
                });
            });
        } else {
            return res.status(500).json({
                Error: 'Manager can not updated !! => ERR:BCRYPT ERROR'
            });
        }
    });

};
exports.findManager = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Message: 'Values/Value missing when manager finding!'
        });
    }
    Manager.findOne({
        where: {
            Id: req.body.Id,
        }
    }).then(result =>
        res.status(200).json({
            Manager: result
        })
    ).catch(err => {
        res.status(500).json({
            Error: 'Manager can not find !! => ERR:' + err
        });
    });
};
exports.getManagers = (req, res, next) => {
    Manager.findAll()
        .then(result => {
            res.status(200).json({
                Manager: result
            })
        })
        .catch(err => {
            res.status(500).json({
                Error: 'Managers can not find !! => ERR:' + err
            });
        });
};
