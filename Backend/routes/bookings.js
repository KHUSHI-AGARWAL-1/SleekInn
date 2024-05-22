const express= require('express')
const router=express.Router();
const {createBooking,getBooking,getAllBooking}=require('./../controllers/bookingController')
const {verifyToken,verifyAdmin,verifyUser}=require('../utils/verifyToken')


router.post('/booking',verifyUser,createBooking);
router.get('/booking/get/:id',verifyUser,getBooking);
router.get('/booking/getAll',verifyUser,getAllBooking);
module.exports=router;