const express = require('express');
const router = express.Router();
const cors = require('cors');
const AuthMiddleware = require('../Middleware/authMiddleware')
const Employee = require('../Controllers/employeeController');

router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.use(cors());

router.get('/page',Employee.getEmployees);
router.get('/search',Employee.searchEmployees);


module.exports = router;