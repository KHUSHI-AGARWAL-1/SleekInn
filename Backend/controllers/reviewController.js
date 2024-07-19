const Tour = require('../models/Tour')
const Review = require('../models/Review')

const createReview = async (req, res) => {


    try {
        const tourId = req.params.tourId
        console.log(tourId);
        const {username,review,rating}= req.body;
        
        const newReview = new Review({username,review,rating})
        console.log(newReview);
        
        const savedReview = await newReview.save()
        await Tour.findByIdAndUpdate(tourId, { $push: { reviews: savedReview._id } })
        console.log(savedReview);
        
        res.status(200).json({ success: true, msg: "Review Submitted", data: savedReview })
    }
    catch (err) {
        console.log(err);
        
        res.status(500).json({ success: false, msg: "Failed to Submitt" })
    }
}
module.exports = { createReview }