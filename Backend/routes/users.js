const express = require('express');
const { updateUser, getSingleUser, deleteUser, getAllUser } = require('../controllers/userController')
const { verifyUser, verifyAdmin } = require('../utils/verifyToken.js')
const router = express.Router();
const User = require('./../models/User.js')

// router.post('/new',createUser) //create new User
router.put('/user/update/:id', verifyUser, updateUser) //update User
router.delete('/user/delete/:id', verifyUser, deleteUser)  //delete
router.get('/user/get/:id', verifyUser, getSingleUser) //get single
router.get('/user/getall', verifyAdmin, getAllUser) //get all

router.put('/setPremium', verifyUser, async (req, res) => {
    try {
        // Assume user is identified by some authentication mechanism, like req.user
        console.log(req.user.id);
        const userId = req.user.id;
        const token = req.cookies.accesstoken;
        // Update isPremium to true for the user
        const updated = await User.findByIdAndUpdate(userId, { isPremium: true });
        console.log(req.user);

        res.status(200).json({ token: token, data: updated, msg: "updated successfully" });
    } catch (error) {
        console.error('Error setting isPremium:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router; 