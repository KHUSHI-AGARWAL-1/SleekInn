const express= require('express');
const cors= require('cors');
const dotenv=require('dotenv');
const mongoose= require('mongoose');
const cookieParser = require('cookie-parser');
const tourRoute= require('./routes/tours')
const userRoute= require('./routes/users')
const authRoute=require('./routes/auth')
const reviewRoute=require('./routes/reviews')
const bookingRoute=require('./routes/bookings')
const paymentRoute=require('./routes/payment')
// const subsRoute=require('./routes/subscribe')
dotenv.config()
const app= express();
const corsOptions={
    origin:true,
    credentials:true
}
mongoose.set('strictQuery',false)
const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database Connected');
    }
    catch(err){
        console.log(err );
        
         console.log('Database Connection failed');
         
    }
}

app.get('/',(req,res)=>{
    res.send("api is working fine")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/v1",tourRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",authRoute)
app.use("/api/v1",reviewRoute)
app.use("/api/v1",bookingRoute)
app.use(paymentRoute)
// app.use(subsRoute)
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    connect();
    console.log('Backend Connected');
    
})