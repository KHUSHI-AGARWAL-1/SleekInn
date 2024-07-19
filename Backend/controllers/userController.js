const User = require('../models/User')

const createUser=async(req,res)=>{
    const newUser=new User(req.body)
    try{
        const savedUser= await newUser.save()
        res.status(200).json({success:true,msg:"Successfully Created",data:savedUser})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,msg:"Failed To create,Try Again!",})   
    }
}

const updateUser= async(req,res)=>{
    const id = req.params.id
    try{
const updatedUser= await User.findByIdAndUpdate(id,{$set:req.body},
    {new:true})
    res.status(200).json({success:true,msg:"Successfully Updated",data:updatedUser})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,msg:"Failed To update,Try Again!",})   
    }
}

const deleteUser= async(req,res)=>{
    const id = req.params.id
    try{
await User.findByIdAndDelete(id)
    res.status(200).json({success:true,msg:"Successfully Deleted"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,msg:"Failed To Delete,Try Again!",})   
    }
        
    }


const getSingleUser= async(req,res)=>{
    const id = req.params.id
    try{
const user= await User.findById(id).populate("bookings")
    res.status(200).json({success:true,msg:"Successfully Fetched the data",data:user})
    }
    catch(err){
        console.log(err)
        res.status(404).json({success:false,msg:"Data Not Found "})   
    }
}
const getAllUser= async(req,res)=>{
    try{
     const users=await User.find({}).populate("bookings")
     res.status(200).json({success:true,count:users.length ,msg:"Successfully Fetched the data",data:users})
    }
  catch(err){
        console.log(err)
        res.status(404).json({success:false,msg:"Data Not Found "})   
    }
}

module.exports={createUser,updateUser,deleteUser,getAllUser,getSingleUser};