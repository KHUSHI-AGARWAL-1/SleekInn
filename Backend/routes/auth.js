const express= require('express')
const router=express.Router()
const{register,login} = require('../controllers/authController')
const {verifyUser}=require('../utils/verifyToken')
router.post('/auth/register',register)
router.post('/auth/login',login)

router.post('/auth/logout',(req,res)=>{
res.clearCookie('accesstoken')
res.status(200).json({msg:"Logout done"});
})
module.exports=router; 