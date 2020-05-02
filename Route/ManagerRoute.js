const express = require('express');
const router = express.Router();
const ManagerController = require('../Controllers/Manager');
const checkAuthManager = require('../Middleware/check-auth-manager');

router.post('/deleteManager',checkAuthManager,ManagerController.deleteManager);
router.post('/updateManager',checkAuthManager,ManagerController.updateManager);

router.post('/findManager',checkAuthManager,ManagerController.findManager);
router.get('/getManagers',checkAuthManager,ManagerController.getManagers);


module.exports = router;