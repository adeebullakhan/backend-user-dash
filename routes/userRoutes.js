const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser, searchUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getUsers);
router.route('/byid/:id').get(protect, getUserById).put(protect, updateUser).delete(protect, deleteUser);
router.get('/search', protect, searchUsers);
module.exports = router;
