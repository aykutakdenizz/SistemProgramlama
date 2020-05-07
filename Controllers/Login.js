const User = require('../Models/User');
const Manager = require('../Models/Manager');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.post_Login = (req, res, next) => {
    if(req.body.Role == null || req.body.Name == null || req.body.Password == null ){
        return res.status(404).json({
            Error: 'Values/Value missing when log in!'
        });
    }
    if(req.body.Role==="User"){
        User.findOne({
            where: {
                Name: req.body.Name,
            }
        }).then(user => {
            if ((user == null)) {
                return res.status(401).json({
                    Error: 'User auth failed !'
                });
            }
            bcrypt.compare(req.body.Password, user.Password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        Error: 'User Auth failed !'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            Name: user.Name,
                            Id: user.Id,
                            Password:req.body.Password,
                            Role: "User",
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        Response: 'User Auth successful',
                        Token: token,
                        Role: "User",
                    });
                }
                return res.status(401).json({
                    Error: 'User Auth failed !'
                });
            });
        }).catch(err => {
            return res.status(500).json({
                Error: 'Values missing when user log in ERR:' + err
            });
        });
    }
    else if (req.body.Role === "Manager"){
        Manager.findOne({
            where: {
                Name: req.body.Name,
            }
        }).then(manager => {
            if ((manager == null)) {
                return res.status(401).json({
                    Error: 'Manager auth failed !'
                });
            }
            bcrypt.compare(req.body.Password, manager.Password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        Error: 'Manager auth failed !'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            Name: manager.Name,
                            Id: manager.Id,
                            Password:req.body.Password,
                            Role: "Manager",
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        Response: 'Manager auth successful',
                        Token: token,
                        Role: "Manager",
                    });
                }
                return res.status(401).json({
                    Error: 'Manager auth failed !'
                });
            });
        }).catch(err => {
            return res.status(500).json({
                Error: 'Values missing when manager log in ERR:' + err
            });
        });
    }
    else{
        return res.status(500).json({
            Error: 'Invalid Role when log in!'
        });
    }

};