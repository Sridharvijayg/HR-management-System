const Employee = require('../Models/EmployeeModel');
const path = require('path')
const fs = require('fs')

const getEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const employees = await Employee.find().skip(skip).limit(limit).select('-password');

        const total = await Employee.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(total / limit);

        // Respond with paginated employees
        res.status(200).json({
            page,
            limit,
            totalPages,
            totalEmployees: total,
            employees
        });
    } catch (err) {
        console.error('Error fetching employee list:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const searchEmployees = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search parameter is required' });
        }

        let searchCriteria = {};

        // Check if query is a valid number (to assume it's an employeeId)
        if (!isNaN(query)) {
            searchCriteria.employeeId = query;
        } else {
            // If it's not a number, assume it's a name and search with a partial match (case-insensitive)
            searchCriteria.name = { $regex: query, $options: 'i' };
        }

        // Find employees that match the search criteria
        const employees = await Employee.find(searchCriteria).select('-password'); // Exclude sensitive fields like password

        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        // Return the found employees
        res.status(200).json({ employees });

    } catch (err) {
        console.error('Error searching for employees:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


const AddEmployee = async (req, res) => {
  try {
    const { employeeId, name, email, position, department, dob, address, contact, gender } = req.body;

    // Save file URL for the profile picture
    const profilePictureUrl = `http://localhost:5000/public/uploads/${req.file.filename}`;

    // Create new employee object
    const newEmployee = new Employee({
      employeeId,
      name,
      email,
      position,
      department,
      gender,
      dob,
      address,
      contact,
      profilePictureUrl
    });

    // Save employee to the database
    await newEmployee.save();

    res.status(200).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding employee' });
  }
}

const deleteEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params; // Get employeeId from URL params
  
      // Find and delete the employee by employeeId
      const deletedEmployee = await Employee.findOneAndDelete({ employeeId });
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting employee' });
    }
  };

const getOneEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params; // Get the employeeId from the URL parameters
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

const updateEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params; // Get the employeeId from the URL parameters
      const { name, email, position, department, dob, address, contact, gender } = req.body;
  
      // Check if a file was uploaded
      let profilePictureUrl = req.file ? `http://localhost:5000/public/uploads/${req.file.filename}` : undefined;
  
      // Find the employee by employeeId
      const employee = await Employee.findOne({ employeeId });
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Update employee details
      employee.name = name || employee.name;
      employee.email = email || employee.email;
      employee.position = position || employee.position;
      employee.department = department || employee.department;
      employee.dob = dob || employee.dob;
      employee.address = address || employee.address;
      employee.contact = contact || employee.contact;
      employee.gender = gender || employee.gender;
      if (profilePictureUrl) {
        // Remove the old profile picture if it exists
        if (employee.profilePictureUrl) {
          const oldFilePath = path.join(__dirname, '..', employee.profilePictureUrl);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
        employee.profilePictureUrl = profilePictureUrl;
      }
  
      // Save updated employee
      await employee.save();
  
      res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Error updating employee' });
    }
  };
  

module.exports = { getEmployees,searchEmployees, AddEmployee, deleteEmployee, getOneEmployee, updateEmployee};
