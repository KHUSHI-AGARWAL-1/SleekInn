const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();

const register = async (req, res) => {
    try {
        //hashing of password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({ username: req.body.username, email: req.body.email, password: hash, role: req.body.role })
        await newUser.save()
        res.status(200).json({ success: true, msg: "Successfully registered" })
        console.log("hii");
    }
    catch (err) {
        res.status(500).json({ success: false, msg: "failed to register" })
    }
}

const login = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email })

        if (!user) {//if no such user exits 
            return res.status(404).json({ success: false, msg: 'User not found' })
        }

        //if user exits check for password
        const checkPassword = await bcrypt.compare(req.body.password, user.password)

        //if pass incorrect
        if (!checkPassword) {
            return res.status(401).json({ success: false, msg: 'Incorrect email or password' })
        }
        const { password, role, ...rest } = user._doc

        //create jwt token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })


        //set token in browser cookies and send res to user
        res.cookie('accesstoken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({
            success: true,
            msg: "Successfully Login",
            token,
            data: { token, password, role, ...rest }, role
        })
        console.log(user);
        console.log(token);

    }
    catch (err) {
        res.status(500).json({ success: false, msg: 'Failed to Login' })
    }
}

module.exports = { register, login }
