const Employee = require('../Models/EmployeeModel');

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


module.exports = { getEmployees,searchEmployees };
