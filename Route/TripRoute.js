const express = require('express');
const router = express.Router();
const TripController = require('../Controllers/Trip');
const checkAuth = require('../Middleware/check-auth');
const checkAuthManager = require('../Middleware/check-auth-manager');

router.post('/addTrip',checkAuthManager,TripController.addTrip);
router.post('/deleteTrip',checkAuthManager,TripController.deleteTrip);
router.post('/updateTrip',checkAuthManager,TripController.updateTrip);

router.post('/findTrip',checkAuth,TripController.findTrip);
router.get('/getTrips',checkAuth,TripController.getTrips);


module.exports = router;