const Booking= require('../models/Booking')
const User= require('../models/User')

const createBooking=async(req,res)=>{
    console.log(req.user);
    // const tourId=req.params.tourId
    const userId=req.user.id;
    const newBooking = new Booking({
        ...req.body,
        userId: userId
    });
    try{
const savedBooking=await newBooking.save()
await User.findByIdAndUpdate(userId,{$push:{bookings:savedBooking._id}})  
res.status(200).json({success:true,msg:"Tour booked Successfully",data:savedBooking})
    }
    catch(err){
        console.error(err); 
         res.status(500).json({success:false,msg:"Failed to Book"})
    }
}

const getBooking = async (req,res)=>{ //single 
    const id=req.params.id

try{
    const book=await Booking.findById(id)
    const token = req.cookies.accesstoken;
    res.status(200).json({success:true,msg:"Successfully fetched",data:{book,token:token}});
}
catch(err){
    res.status(404).json({success:false,msg:"Failed to Fetched"})
}
}

const getAllBooking = async (req,res)=>{ //all 
  
try{
    const books=await Booking.find()
    res.status(200).json({success:true,msg:"Successfully fetched",data:books});
}
catch(err){
    res.status(500).json({success:false,msg:"Failed to Fetched"})
}
}

module.exports={createBooking,getBooking,getAllBooking}