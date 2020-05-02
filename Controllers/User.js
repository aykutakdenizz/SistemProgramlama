const User = require('../Models/User');
const bcrypt = require('bcryptjs');

exports.deleteUser = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Message: 'Values/Value missing when user deleting!'
        });
    }
    User.destroy({
        where: {
            Id: req.body.Id
        }
    }).then(result => {
        res.status(200).json({
            User: result
        })
    }).catch(err => {
        res.status(500).json({
            Error: 'User can not deleted !! => ERR:' + err
        });
    });
};
exports.updateUser = (req, res, next) => {
    if (req.body.Name == null || req.body.Password == null || req.body.Real_Name == null || req.body.Surname == null || req.body.Money == null) {
        return res.status(404).json({
            Message: 'Values/Value missing when user updating!'
        });
    }
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        if (!err) {
            User.update({
                    Name: req.body.Name,
                    Password: hash,
                    Real_Name: req.body.Real_Name,
                    Surname: req.body.Surname,
                    Money: req.body.Money,
                },
                {
                    where: {
                        Id: req.body.Id
                    }
                }
            ).then(result =>{
                if(result[0]===1){
                    return res.status(200).json({
                        User: {
                            Id: req.body.Id,
                            Name: req.body.Name,
                            Password: hash,
                            Real_Name: req.body.Real_Name,
                            Surname: req.body.Surname,
                            Money: req.body.Money,
                        }
                    });
                }
                else{
                    return res.status(200).json({
                        User: null
                    });
                }
            }

            ).catch(err => {
                res.status(500).json({
                    Error: 'User can not updated !! => ERR:' + err
                });
            });
        }
    });


};
exports.findUser = (req, res, next) => {
    User.findOne({
        where: {
            Id: req.body.Id,
        }
    }).then(result =>
        res.status(200).json({
            User: result
        })
    ).catch(err => {
        res.status(500).json({
            Error: 'User can not find !! => ERR:' + err
        });
    });
};
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(result => {
            res.status(200).json({
                User: result
            })
        })
        .catch(err => {
            res.status(500).json({
                Error: 'Users can not find !! => ERR:' + err
            });
        });
};
