const express = require('express');
const router = express.Router();
const SignUpController = require('../Controllers/Signup');


router.post('/',SignUpController.post_SignUp);



module.exports = router;