const User = require('../models/userModel');

// @desc Fetch all users
// @route GET /api/users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get single user by ID
// @route GET /api/users/:id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update user
// @route PUT /api/users/:id
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete user
// @route DELETE /api/users/:id
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const searchUsers = async (req, res) => {
    try {
        // Build a query object based on req.query
        const query = {};
        console.log(req.query)

        // Add filters based on query parameters
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' }; // case-insensitive search for name
        }
        if (req.query.email) {
            query.email = { $regex: req.query.email, $options: 'i' }; // case-insensitive search for email
        }
        // Perform the search
        const users = await User.find(query);

        // Return the results
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getUsers, getUserById, updateUser, deleteUser ,searchUsers};
