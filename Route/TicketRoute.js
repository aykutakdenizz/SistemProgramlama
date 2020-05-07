const express = require('express');
const router = express.Router();
const TicketController = require('../Controllers/Ticket');
const checkAuth = require('../Middleware/check-auth');
const checkAuthManager = require('../Middleware/check-auth-manager');
const checkAuthUser = require('../Middleware/check-auth-only-user');

router.post('/addTicket',checkAuthUser,TicketController.addTicket);
router.post('/deleteTicket',checkAuthUser,TicketController.deleteTicket);
router.post('/updateTicket',checkAuthUser,TicketController.updateTicket);

router.post('/findTicket',checkAuth,TicketController.findTicket);
router.post('/getTicketsWithToken',checkAuth,TicketController.getTicketsWithToken);
router.get('/getTickets',checkAuthManager,TicketController.getTickets);


module.exports = router;