const express = require('express');
const router = express.Router();
const TicketController = require('../Controllers/Ticket');
const checkAuth = require('../Middleware/check-auth');

router.post('/addTicket',checkAuth,TicketController.addTicket);
router.post('/deleteTicket',checkAuth,TicketController.deleteTicket);
router.post('/updateTicket',checkAuth,TicketController.updateTicket);

router.post('/findTicket',checkAuth,TicketController.findTicket);
router.get('/getTickets',checkAuth,TicketController.getTickets);


module.exports = router;