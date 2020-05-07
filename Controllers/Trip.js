const Trip = require('../Models/Trip');
const Ticket = require('../Models/Ticket');
exports.addTrip = (req, res, next) => {
    const newTrip = new Trip({
        //Id: req.body.Id,
        Is_Active: req.body.Is_Active,
        Destination: req.body.Destination,
        Departure: req.body.Departure,
        Departure_Time: req.body.Departure_Time,
        Bus_Id: req.body.Bus_Id,
        Driver_Id: req.body.Driver_Id,
        Payment: req.body.Payment
    });
    newTrip.save(newTrip).then(result => {
        res.status(201).json({
            Trip: result
        })
    }).catch(err => {
        res.status(500).json({
            Error: 'Trip can not added !! => ERR:' + err
        });
    });
};
exports.deleteTrip = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when deleting trip!'
        });
    }
    Trip.destroy({
        where: {
            Id: req.body.Id
        }
    }).then(result => {
        res.status(200).json({
            Trip: result
        })
    }).catch(err => {
        res.status(500).json({
            Error: 'Trip can not deleted !! => ERR:' + err
        });
    });
};
exports.updateTrip = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when updating trip!'
        });
    }
    Trip.update({
            Is_Active: req.body.Is_Active,
            Destination: req.body.Destination,
            Departure: req.body.Departure,
            Departure_Time: req.body.Departure_Time,
            Bus_Id: req.body.Bus_Id,
            Driver_Id: req.body.Driver_Id,
            Payment: req.body.Payment
        },
        {
            where: {
                Id: req.body.Id
            }
        }
    ).then(result =>{
        if(result[0]===1){
            return res.status(200).json({
                Trip: {
                    Id: req.body.Id,
                    Is_Active: req.body.Is_Active,
                    Destination: req.body.Destination,
                    Departure: req.body.Departure,
                    Departure_Time: req.body.Departure_Time,
                    Bus_Id: req.body.Bus_Id,
                    Driver_Id: req.body.Driver_Id,
                    Payment: req.body.Payment
                }
            })
        }
        else{
            return res.status(200).json({
                Trip: null
            });
        }
    }).catch(err => {
        res.status(500).json({
            Error: 'Trip can not updated !! => ERR:' + err
        });
    });
};
exports.findTrip = (req, res, next) => {
    if (req.body.Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when finding trip!'
        });
    }
    Trip.findOne({
        where: {
            Id: req.body.Id,
        }
    }).then(result =>
        res.status(200).json({
            Trip: result
        })
    ).catch(err => {
        res.status(500).json({
            Error: 'Trip can not find !! => ERR:' + err
        });
    });
};
exports.getTrips = (req, res, next) => {
    Trip.findAll()
        .then(result => {
            res.status(200).json({
                Trip: result
            })
        })
        .catch(err => {
            res.status(500).json({
                Error: 'Trips can not find !! => ERR:' + err
            });
        });
};
exports.findTripWithTicket = (req, res, next) => {
    if (req.body.Ticket_Id == null) {
        return res.status(404).json({
            Error: 'Values/Value missing when finding trip!'
        });
    }
    Ticket.findOne({
        where: {
            Id: req.body.Ticket_Id,
        }
    }).then(ticket=>{
        Trip.findOne({
            where: {
                Id: ticket.Trip_Id,
            }
        }).then(result =>
            res.status(200).json({
                Trip: result,
                Ticket:ticket,
            })
        ).catch(err => {
            res.status(500).json({
                Error: 'Trip can not find !! => ERR:' + err
            });
        });
    }).catch(err => {
        res.status(500).json({
            Error: 'Trip can not find !! => ERR:' + err
        });
    });
};
