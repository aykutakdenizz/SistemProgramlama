const express = require('express');
const router = express.Router();
const LoginController = require('../Controllers/Login');


router.post('/',LoginController.post_Login);



module.exports = router;