const Bus = require('../Models/Bus');

exports.addBus = (req, res, next) => {
    if (req.body.Plate == null || req.body.Seat_Plan == null || req.body.Empty_Seats == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when adding bus!'
        });
    }
    const newBus = new Bus({
        Plate: req.body.Plate,
        Seat_Plan: req.body.Seat_Plan,
        Empty_Seats: req.body.Empty_Seats
    });
    //Created a new bus with req values
    newBus.save(newBus).then(bus => {
        res.status(201).json({
            Bus: bus
        });
        //That bus saved database and return message
    }).catch(err => {
        res.status(500).json({
            Error: 'Bus can not added !! => ERR:' + err
        });
        //When saving bus, error occurred and that error message returned
    });
};
exports.deleteBus = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when deleting bus!'
        });
    }
    Bus.destroy({
        where: {
            Id: req.body.Id
        }
    }).then(response => {
        res.status(200).json({
            Bus: response
        })
    }).catch(err => {
        res.status(500).json({
            Error: 'Bus can not deleted !! => ERR:' + err
        });
    });
};
exports.updateBus = (req, res, next) => {
    if (req.body.Plate == null || req.body.Seat_Plan == null || req.body.Empty_Seats == null || req.body.Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when updating bus!'
        });
    }
    Bus.update({
            Plate: req.body.Plate,
            Seat_Plan: req.body.Seat_Plan,
            Empty_Seats: req.body.Empty_Seats
        },
        {
            where: {
                Id: req.body.Id
            }
        }
    ).then(result => {
            if (result[0] === 1) {
                return res.status(200).json({
                    Bus: {
                        Id: req.body.Id,
                        Plate: req.body.Plate,
                        Seat_Plan: req.body.Seat_Plan,
                        Empty_Seats: req.body.Empty_Seats
                    }
                });
            } else {
                return res.status(200).json({
                    Bus: null
                });
            }
        }
    ).catch(err => {
        res.status(500).json({
            Error: 'Bus can not updated !! => ERR:' + err
        });
    });
};
exports.findBus = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when finding bus!'
        });
    }
    Bus.findOne({
        where: {
            Id: req.body.Id,
        }
    }).then(result =>
        res.status(200).json({
            Bus: result
        })
    ).catch(err => {
        res.status(500).json({
            Error: 'Bus can not find !! => ERR:' + err
        });
    });
};
exports.getBuses = (req, res, next) => {
    Bus.findAll()
        .then(result => {
            res.status(200).json({
                Bus: result
            })
        })
        .catch(err => {
            res.status(500).json({
                Error: 'Buses can not find !! => ERR:' + err
            });
        });
};
