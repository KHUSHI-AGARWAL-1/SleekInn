const Tour = require('../models/Tour')

const createTour=async(req,res)=>{
    const newTour=new Tour(req.body)
    try{
        const savedTour= await newTour.save()
        res.status(200).json({success:true,msg:"Successfully Created",data:savedTour})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,msg:"Failed To create,Try Again!",})   
    }
}

const updateTour= async(req,res)=>{
    const id = req.params.id
    try{
const updatedTour= await Tour.findByIdAndUpdate(id,{$set:req.body},
    {new:true})
    res.status(200).json({success:true,msg:"Successfully Updated",data:updatedTour})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,msg:"Failed To update,Try Again!",})   
    }
}

const deleteTour= async(req,res)=>{
    const id = req.params.id
    try{
await Tour.findByIdAndDelete(id)
    res.status(200).json({success:true,msg:"Successfully Deleted"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,msg:"Failed To Delete,Try Again!",})   
    }
        
    }


const getSingleTour= async(req,res)=>{
    const id = req.params.id
    try{
const tour= await Tour.findById(id).populate('reviews')
    res.status(200).json({success:true,msg:"Successfully Fetched the data",data:tour})
    }
    catch(err){
        console.log(err)
        res.status(404).json({success:false,msg:"Data Not Found "})   
    }
}
const getAllTour= async(req,res)=>{
    const page=parseInt(req.query.page);
    // console.log(page)
    try{
     const tours=await Tour.find({}).populate('reviews').skip(page*8).limit(8)
     res.status(200).json({success:true,count:tours.length ,msg:"Successfully Fetched the data",data:tours})
    }
  catch(err){
        console.log(err)
        res.status(404).json({success:false,msg:"Data Not Found "})   
    }
}

const getTourBySearch=async(req,res)=>{
    const city= new RegExp(req.query.city,'i')
    const distance= parseInt(req.query.distance)
    const maxGroupSize= parseInt(req.query.maxGroupSize)
    try{
        const tours= await Tour.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate("reviews")
        res.status(200).json({success:true,count:tours.length ,msg:"Successfully Fetched the data",data:tours})
    }
    catch(err){
        console.log(err)
        res.status(404).json({success:false,msg:"Data Not Found "})   
    }
}

const getFeaturedTour= async(req,res)=>{
    try{
     const tours=await Tour.find({featured:true}).populate("reviews").limit(8)
     res.status(200).json({success:true,count:tours.length ,msg:"Successfully Fetched the data",data:tours})
    }
  catch(err){
        console.log(err)
        res.status(404).json({success:false,msg:"Data Not Found "})   
    }
}

const getTourCount=async(req,res)=>{
    try{
        const tourCount=await Tour.estimatedDocumentCount()
        res.status(200).json({success:true,data:tourCount})

    }
    catch(err){
        res.status(500).json({success:false,msg:"Failed to Fetch"})
    }
}

module.exports={createTour,updateTour,deleteTour,getAllTour,getSingleTour,getTourBySearch,getFeaturedTour,getTourCount};