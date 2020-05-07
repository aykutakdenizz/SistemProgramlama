const express = require('express');
const router = express.Router();
const TicketController = require('../Controllers/Ticket');
const checkAuth = require('../Middleware/check-auth');
const checkAuthManager = require('../Middleware/check-auth-manager');

router.post('/addTicket',checkAuth,TicketController.addTicket);
router.post('/deleteTicket',checkAuth,TicketController.deleteTicket);
router.post('/updateTicket',checkAuth,TicketController.updateTicket);

router.post('/findTicket',checkAuth,TicketController.findTicket);
router.post('/getUserTickets',checkAuth,TicketController.getUserTickets);
router.get('/getTickets',checkAuthManager,TicketController.getTickets);


module.exports = router;