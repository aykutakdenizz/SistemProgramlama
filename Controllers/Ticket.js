const Ticket = require('../Models/Ticket');
const User = require('../Models/User');
const Trip = require('../Models/Trip');
const Bus = require('../Models/Bus');
const Manager = require('../Models/Manager');
const jwt = require('jsonwebtoken');

exports.addTicket = async (req, res, next) => {
    let user;
    let trip;
    let bus;
    if (req.body.Seat == null || req.body.Trip_Id == null) {
        return res.status(500).json({
            Error: 'Value/Values missing when adding ticket'
        });
    }
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const values = decoded;
    const role = values.Role;
    const id = values.Id;
    if (role === "User") {
        user = await findUser({User_Id: id});
        if (user == null) {
            return res.status(500).json({
                Error: 'There is no user or error occur when adding ticket!!'
            });
        }
        trip = await findTrip({Trip_Id: req.body.Trip_Id});
        if (trip == null) {
            return res.status(500).json({
                Error: 'There is no trip or error occur when adding ticket!!'
            });
        }
        bus = await findBus(trip);
        if (bus == null) {
            return res.status(500).json({
                Error: 'There is no bus or error occur when adding ticket!!'
            });
        }
        if ((user.Money >= trip.Payment) && checkSeat(bus.Empty_Seats, req.body.Seat)) {
            User.update({
                    Money: (user.Money - trip.Payment)
                },
                {
                    where: {
                        Id: user.Id
                    }
                }).then(result => {
                    const newTicket = new Ticket({
                        Trip_Id: req.body.Trip_Id,
                        Seat: req.body.Seat,
                        User_Id: id
                    });
                    newTicket.save(newTicket).then(user => {
                        Bus.update({
                                Empty_Seats: removeSeat(bus.Empty_Seats, req.body.Seat)
                            },
                            {
                                where: {
                                    Id: trip.Bus_Id
                                }
                            }).then(result => {
                            res.status(200).json({
                                Ticket: result[0]
                            })
                        }).catch(err => {
                            res.status(500).json({
                                Error: 'Bus can not updated when ticket added!! => ERR:' + err
                            });
                        });
                    }).catch(err => {
                        res.status(500).json({
                            Error: 'Ticket can not added !! => ERR:' + err
                        });
                    });
                }
            ).catch(err => {
                res.status(500).json({
                    Error: 'User can not updated when paying ticket !! => ERR:' + err
                });
            });

        } else {
            res.status(500).json({
                Error: 'Ticket can not added no enough money or that seat is not empty!! => ERR:'
            });
        }
    } else {
        return res.status(500).json({
            Error: 'Managers can not buy ticket'
        });
    }
};

exports.deleteTicket = async (req, res, next) => {
    let user;
    let trip;
    let bus;
    let ticket;
    ticket = await findTicket(req.body);
    if (ticket == null) {
        return res.status(500).json({
            Error: 'There is no ticket or error occur when deleting ticket!!'
        });
    }
    user = await findUser(ticket);
    if (user == null) {
        return res.status(500).json({
            Error: 'There is no user or error occur when deleting ticket!!'
        });
    }
    trip = await findTrip(ticket);
    if (trip == null) {
        return res.status(500).json({
            Error: 'There is no trip or error occur when deleting ticket!!'
        });
    }
    bus = await findBus(trip);
    if (bus == null) {
        return res.status(500).json({
            Error: 'There is no bus or error occur when deleting ticket!!'
        });
    }
    User.update({
            Money: (user.Money + trip.Payment)
        },
        {
            where: {
                Id: user.Id
            }
        }).then(result => {
            Ticket.destroy({
                where: {
                    Id: req.body.Id
                }
            }).then(response => {
                Bus.update({
                        Empty_Seats: addSeat(bus.Empty_Seats, ticket.Seat)
                    },
                    {
                        where: {
                            Id: trip.Bus_Id
                        }
                    }).then(result =>
                    res.status(200).json({
                        Ticket: result
                    })).catch(err => {
                    res.status(500).json({
                        Error: 'Bus can not updated when ticket deleted!! => ERR:' + err
                    });
                });
            }).catch(err => {
                res.status(500).json({
                    Error: 'Ticket can not deleted !! => ERR:' + err
                });
            });
        }
    ).catch(err => {
        res.status(500).json({
            Error: 'User can not updated when deleting ticket !! => ERR:' + err
        });
    });


};

exports.updateTicket = async (req, res, next) => {
    if (req.body.Seat == null || req.body.Id == null) {
        return res.status(500).json({
            Error: 'Value/Values missing when update ticket'
        });
    }
    let ticket;
    let bus;
    let trip;
    ticket = await findTicket(req.body);
    if (ticket == null) {
        return res.status(500).json({
            Error: 'There is no ticket or error occur when updating ticket!!'
        });
    }
    trip = await findTrip(ticket);
    if (trip == null) {
        return res.status(500).json({
            Error: 'There is no trip or error occur when updating ticket!!'
        });
    }
    bus = await findBus(trip);
    if (bus == null) {
        return res.status(500).json({
            Error: 'There is no bus when updating ticket!!'
        });
    }
    if (checkSeat(bus.Empty_Seats, req.body.Seat)) {
        Ticket.update({
                Seat: req.body.Seat,
            },
            {
                where: {
                    Id: req.body.Id
                }
            }
        ).then(result => {
            const oldSeat = ticket.Seat;
            let seats = removeSeat(bus.Empty_Seats, req.body.Seat);
            let last_seats = addSeat(seats, oldSeat);
            Bus.update({
                    Empty_Seats: last_seats
                },
                {
                    where: {
                        Id: trip.Bus_Id
                    }
                }).then(result => {
                    if (result[0] === 1) {
                        return res.status(200).json({
                            Ticket: {Id: ticket.Id, Trip_Id: ticket.Trip_Id, Seat: req.body.Seat, User_Id: ticket.User_Id}
                        })
                    } else {
                        return res.status(200).json({
                            Ticket: null
                        });
                    }
                }
            ).catch(err => {
                res.status(500).json({
                    Error: 'Bus can not updated when ticket updating!! => ERR:' + err
                });
            });
        }).catch(err => {
            res.status(500).json({
                Error: 'Ticket can not updated !! => ERR:' + err
            });
        });
    } else {
        return res.status(500).json({
            Error: 'That seat is not empty when updating ticket!!'
        });
    }

};

exports.findTicket = (req, res, next) => {
    Ticket.findOne({
        where: {
            Id: req.body.Id,
        }
    }).then(result =>
        res.status(200).json({
            Ticket: result
        })
    ).catch(err => {
        res.status(500).json({
            Error: 'Ticket can not find !! => ERR:' + err
        });
    });
};

exports.getTickets = (req, res, next) => {
    Ticket.findAll()
        .then(result => {
            res.status(200).json({
                Ticket: result
            })
        })
        .catch(err => {
            res.status(500).json({
                Error: 'Tickets can not find !! => ERR:' + err
            });
        });
};

exports.getTicketsWithToken = (req, res, next) => {
    if (req.body.Token == null) {
        return res.status(500).json({
            Error: 'Value/Values missing when update ticket'
        });
    }
    const decoded = jwt.verify(req.body.Token, process.env.JWT_KEY);
    const values = decoded;
    const role = values.Role;
    const id = values.Id;
    if (role === "User") {
        User.findOne({where: {Id: id}}).then(user => {
            if (user !== null) {
                Ticket.findAll({where: {User_Id: user.Id}})
                    .then(result => {
                        return res.status(200).json({
                            Ticket: result
                        })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            Error: 'Tickets can not find !! => ERR:' + err
                        });
                    });
            } else {
                return res.status(500).json({
                    Error: 'Invalid user Id when get tickets'
                });
            }
        }).catch(err => {
            return res.status(500).json({
                Error: 'Tickets can not get !! => ERR:' + err
            });
        });
    } else {
        Manager.findOne({where: {Id: id}}).then(manager => {
            if (manager !== null) {
                Ticket.findAll()
                    .then(result => {
                        res.status(200).json({
                            Ticket: result
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            Error: 'Tickets can not find !! => ERR:' + err
                        });
                    });
            } else {
                return res.status(500).json({
                    Error: 'Invalid manager Id when get tickets'
                });
            }
        }).catch(err => {
            return res.status(500).json({
                Error: 'Tickets can not get !! => ERR:' + err
            });
        });
    }
};

function checkSeat(seats, selectedSeat) {
    let state = false;
    seats.forEach(seat => {
        if (seat === selectedSeat) {
            state = true;
        }
    });
    return state;
}

function removeSeat(seats, selectedSeat) {
    let new_seats = [];
    seats.forEach(seat => {
        if (seat === selectedSeat) {
        } else {
            new_seats.push(seat);
        }
    });
    return new_seats;
}

function addSeat(seats, selectedSeat) {
    let new_seats = [];
    seats.forEach(seat => {
        new_seats.push(seat);
    });
    new_seats.push(selectedSeat);
    return new_seats;
}

async function findTicket(reqBody) {
    let new_ticket = null;
    await Ticket.findOne({
        where: {
            Id: reqBody.Id,
        }
    }).then(result => {
        new_ticket = result;
    }).catch(err => {
        new_ticket = null;
    });
    return new_ticket;
}

async function findTrip(ticket) {
    let trip = null;
    await Trip.findOne({
        where: {
            Id: ticket.Trip_Id,
        }
    }).then(result => {
        trip = result;
    }).catch(err => {
        trip = null;
    });
    return trip;
}

async function findBus(trip) {
    let bus = null;
    await Bus.findOne({
        where: {
            Id: trip.Bus_Id,
        }
    }).then(result => {
        bus = result;
    }).catch(err => {
        bus = null;
    });
    return bus;
}

async function findUser(reqBody) {
    let user = null;
    await User.findOne({
        where: {
            Id: reqBody.User_Id,
        }
    }).then(result_user => {
        user = result_user;
    }).catch(err => {
        user = null;
    });
    return user;
}
