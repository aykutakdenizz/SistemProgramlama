const User = require('../Models/User');
const Manager = require('../Models/Manager');
const bcrypt = require('bcryptjs');

exports.post_SignUp = (req, res, next) => {
    if (req.body.Role == null || req.body.Name == null || req.body.Password == null || req.body.Real_Name == null || req.body.Surname == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when sign up!'
        });
    }
    if (req.body.Role === "User") {
        User.findOne({
            where: {
                Name: req.body.Name,
            }
        }).then(user => {
            if (user) {
                return res.status(409).json({
                    Error: 'User name exists!'
                });
            } else {
                bcrypt.hash(req.body.Password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            Error: err
                        });
                        console.log(err);
                    } else {
                        const user = new User({
                            Name: req.body.Name,
                            Password: hash,
                            Real_Name: req.body.Real_Name,
                            Surname: req.body.Surname,
                            Money: 0,
                        });
                        user.save(user)
                            .then(result => {
                                res.status(201).json({
                                    User: "User " + user.Name + ' is created.'
                                })
                            }).catch(err => {
                            res.status(500).json({
                                Error: err
                            })
                        })
                    }
                })
            }
        }).catch(err => {
            res.status(500).json({
                Error: 'Values missing when user sign up ERR:' + err
            });
        });
    } else if (req.body.Role === "Manager") {
        if (req.body.Master_Manager_Name == null || req.body.Master_Manager_Password == null) {
            return res.status(404).json({
                Error: 'Master manager values/value missing when sign up!'
            });
        }
        if (req.body.Master_Manager_Name === "admin" && req.body.Master_Manager_Password === "admin") {
            Manager.findOne({
                where: {
                    Name: req.body.Name,
                }
            }).then(manager => {
                if (manager) {
                    return res.status(409).json({
                        Error: 'Manager name exists!'
                    });
                } else {
                    bcrypt.hash(req.body.Password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                Error: err
                            });
                        } else {
                            const manager = new Manager({
                                Name: req.body.Name,
                                Password: hash,
                                Real_Name: req.body.Real_Name,
                                Surname: req.body.Surname
                            });
                            manager.save(manager)
                                .then(result => {
                                    return res.status(201).json({
                                        Manager: "Manager " + manager.Name + ' is created.'
                                    })
                                }).catch(err => {
                                return res.status(500).json({
                                    Error: err
                                })
                            })
                        }
                    })
                }
            }).catch(err => {
                return res.status(500).json({
                    Error: 'Manager occur error' + err
                });
            });
        }
        else {
            return res.status(409).json({
                Error: 'There is no master that value!'
            });
        }
    } else {
        return res.status(404).json({
            Error: 'Invalid role when log in!'
        });
    }
};
