const express = require('express');
const router = express.Router();
const EmployeeController = require('../Controllers/Employee');
const checkAuth = require('../Middleware/check-auth');
const checkAuthManager = require('../Middleware/check-auth-manager');

router.post('/addEmployee',checkAuthManager,EmployeeController.addEmployee);
router.post('/deleteEmployee',checkAuthManager,EmployeeController.deleteEmployee);
router.post('/updateEmployee',checkAuthManager,EmployeeController.updateEmployee);

router.post('/findEmployee',checkAuth,EmployeeController.findEmployee);
router.get('/getEmployees',checkAuth,EmployeeController.getEmployees);


module.exports = router;