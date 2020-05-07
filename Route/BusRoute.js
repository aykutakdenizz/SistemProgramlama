const express = require('express');
const router = express.Router();
const BusController = require('../Controllers/Bus');
const checkAuth = require('../Middleware/check-auth');
const checkAuthManager = require('../Middleware/check-auth-manager');

router.post('/addBus',checkAuthManager,BusController.addBus);
router.post('/deleteBus',checkAuthManager,BusController.deleteBus);
router.post('/updateBus',checkAuthManager,BusController.updateBus);

router.post('/findBus',checkAuth,BusController.findBus);
router.post('/findBusWithTicket',checkAuth,BusController.findBusWithTicket);
router.post('/findBusWithTrip',checkAuth,BusController.findBusWithTrip);
router.get('/getBuses',checkAuth,BusController.getBuses);


module.exports = router;