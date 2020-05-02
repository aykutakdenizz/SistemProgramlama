const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User');
const checkAuth = require('../Middleware/check-auth');
const checkAuthManager = require('../Middleware/check-auth-manager');
router.post('/deleteUser',checkAuthManager,UserController.deleteUser);
router.post('/updateUser',checkAuthManager,UserController.updateUser);

router.post('/findUser',checkAuth,UserController.findUser);
router.get('/getUsers',checkAuthManager,UserController.getUsers);


module.exports = router;