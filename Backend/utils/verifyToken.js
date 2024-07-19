const jwt = require('jsonwebtoken');
require("dotenv").config();
const verifyToken = (req, res, next) => {
    console.log(req.cookies);
    console.log('tushar');
    
    // console.log(req.headers.authorization);
    console.log("cookies");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    console.log(token + " toekn");
    //console.log(token + " verify");

    if (!token) {
        return res.status(401).json({ success: false, msg: "You are not authorized" });
    }

    // If token exists then verify
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, msg: "Token is invalid" });
        }
        req.user = user;
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        // Yahaan 'req.user' mein user object milna chahiye, jo token se decode hua hai
        console.log(req.user + "verify");
        if (req.user && req.user.role === 'user') {
            next(); // Agar user role 'user' hai, toh next middleware ko call karein
        } else {
            return res.status(401).json({ success: false, msg: "You're not authenticated" });
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Yahaan 'req.user' mein user object milna chahiye, jo token se decode hua hai
        if (req.user && req.user.role === 'admin') {
            next(); // Agar user role 'admin' hai, toh next middleware ko call karein
        } else {
            return res.status(401).json({ success: false, msg: "Not Authenticated as Admin" });
        }
    });
};



module.exports = { verifyToken, verifyUser, verifyAdmin };
