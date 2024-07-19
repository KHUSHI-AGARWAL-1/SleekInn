const express= require('express');
const {createTour,updateTour,getSingleTour,deleteTour,getAllTour,getTourBySearch,getFeaturedTour,getTourCount} = require('../controllers/tourController')
const router= express.Router();
const {verifyAdmin}=require('../utils/verifyToken')

router.post('/tours/new',verifyAdmin,createTour) //create new tour
router.put('/tours/update/:id',verifyAdmin,updateTour) //update Tour
router.delete('/tours/delete/:id',verifyAdmin,deleteTour)  //delete
router.get('/tours/get/:id',getSingleTour) //get single
router.get('/tours/getall',getAllTour) //get all
router.get('/tours/getsearch',getTourBySearch) //get searched
router.get('/tours/getfeatured',getFeaturedTour) //get featured
router.get('/tours/getcount',getTourCount) 
module.exports=router;  