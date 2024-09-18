const express = require('express');
const router = express.Router();
const cors = require('cors');
const AuthMiddleware = require('../Middleware/authMiddleware')
const Employee = require('../Controllers/employeeController');
const multer = require('multer');
const path = require('path');

router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.use(cors());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Save files in the /public/uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  }
});

const upload = multer({ storage });

// Add New Employee
router.post('/', upload.single('profilePicture'),Employee.AddEmployee)
router.delete('/:employeeId',Employee.deleteEmployee)
router.get('/page',Employee.getEmployees);
router.get('/search',Employee.searchEmployees);


module.exports = router;