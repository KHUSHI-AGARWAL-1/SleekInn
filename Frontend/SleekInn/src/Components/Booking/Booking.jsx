// import React,{useState} from 'react'
// import "../../styles/booking.css"
// import {Form, FormGroup, ListGroup, ListGroupItem, Button} from 'reactstrap'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import {load} from '@cashfreepayments/cashfree-js'
// const Booking = ({tour, avgRating}) => {

//     const {price, reviews} = tour

//     const [credentials, setCredentials] = useState({
//         userId: '01', //later dynamic
//         userEmail: 'xyz@gmail.com',
//         fullName: '',
//         phone: '',
//         guestSize: 1,
//         bookAt:''

//     })

//     const handleChange = e=>{
//         setCredentials(prev =>({...prev,[e.target.id]:e.target.value}))
//     }

//     const serviceFee = 10
//     const totalAmount = Number(price)* Number(credentials.guestSize)+ Number(serviceFee)
//     const navigate = useNavigate();
//     // send data to server
//     let cashfree;
//     let initializeSDK = async function(){
//       cashfree=await load({
//         mode:"sandbox",
//       })
//     }
//     initializeSDK()
//     const[orderId,setOrderId]=useState("")
//      const getSessionId= async ()=>{
     
//       try {
//         let res = await axios.get("http://localhost:4000/payment")
//         if(res.data && res.data.payment_session_id){
//           console.log(res.data)
//           setOrderId(res.data.order_id)
//           return res.data.payment_session_id
//         }
       
//       } catch (error) {
//         console.log(error)
//       }
  
//     }
     
//   //   const verifyPayment = async()=>{
//   // try {
//   //   let res= await axios.post("http://localhost:8000/verify",{
//   //     orderId:orderId,
//   //   })
//   //   if(res && res.data){
//   //     console.log("verified")
//   //     alert('Payment verified')
//   //   }
//   // } catch (error) {
//   //   console.log(error)
//   // }
//   //   }
  
//     const handleClick= async (e)=>{
//       e.preventDefault()
//       try {
//         let sessionId = await getSessionId()
//         let checkoutOptions={
//           paymentSessionId:sessionId,
//           redirectTarget:"_modal"
  
//         }
//   cashfree.checkout(checkoutOptions).then((res)=>{
//     console.log("payment initiated")
//     // verifyPayment(orderId)
//     navigate('/thank-you')
//   })
//       } catch (error) {
//         console.log(error)
        
//       }
  
//     }

//   return (
//     <div className="booking">
//         <div className="booking_top d-flex align-items-center justify-content-between">
//             <h3>${price} <span>/per person</span></h3>
//              <span className='tour_rating d-flex align-items-center'>
//                     <i class="ri-star-fill"></i>
//                     {avgRating === 0 ? null : avgRating}({reviews?.length})
//               </span>
//         </div>
//         <div className="booking_form">
//             <h5>Information</h5>
//             <Form className='booking_info-form' onSubmit={handleClick}>
//                 <FormGroup>
//                     <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
//                 </FormGroup>
//                 <FormGroup>
//                     <input type="number" placeholder='Phone No.' id='phone' required onChange={handleChange} />
//                 </FormGroup>
//                 <FormGroup className='d-flex align-items-center gap-3'>
//                     <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />

//                     <input type="number" placeholder='Guest' id='guestSize' required onChange={handleChange} />

//                 </FormGroup>
//             </Form>
//         </div>

//         <div className="booking_bottom">
//             <ListGroup>
//                 <ListGroupItem className='border-0 px-0'>
//                     <h5 className='d-flex align-items-center gap-1'>
//                         ${price} <i class="ri-close-line"></i>
//                         1 person</h5>
//                     <span>${price}</span>
//                 </ListGroupItem>

//                 <ListGroupItem className='border-0 px-0'>
//                     <h5>Service charge</h5>
//                     <span> ${serviceFee}</span>
//                 </ListGroupItem>

//                 <ListGroupItem className='border-0 px-0 total'>
//                     <h5>Total</h5>
//                     <span>${totalAmount}</span>
//                 </ListGroupItem>
//             </ListGroup>

//             <Button className='btn primary_btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
//         </div>

//     </div>
//   )
// }

// export default Booking



// import React, { useState } from 'react';
// import "../../styles/booking.css";
// import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { load } from '@cashfreepayments/cashfree-js';

// const Booking = ({ tour, avgRating }) => {

//     const { price, reviews } = tour;

//     const [credentials, setCredentials] = useState({
//         userId: '01', //later dynamic
//         userEmail: 'xyz@gmail.com',
//         fullName: '',
//         phone: '',
//         guestSize: 1,
//         bookAt: ''
//     });

//     const handleChange = e => {
//         setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
//     };

//     const serviceFee = 10;
//     const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);
//     // const navigate = useNavigate();

//     let cashfree;
//     let initializeSDK = async function () {
//         cashfree = await load({
//             mode: "sandbox",
//         });
//     };
//     initializeSDK();
//     const [orderId, setOrderId] = useState("");

//     const getSessionId = async () => {
//         try {
//             const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);
//             let res = await axios.post("http://localhost:4000/payment", {
//                 totalAmount: totalAmount,
//                 customer_phone:credentials.phone,
//                 customer_name: credentials.fullName,
//                 customer_email: credentials.userEmail
//             });
//             if (res.data && res.data.payment_session_id) {
//                 console.log(res.data);
//                 setOrderId(res.data.order_id);
//                 return res.data.payment_session_id;
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleClick = async (e) => {
//         e.preventDefault();
//         try {
//             let sessionId = await getSessionId();
//             let checkoutOptions = {
//                 paymentSessionId: sessionId,
//                 redirectTarget: "_modal"
//             };
//             cashfree.checkout(checkoutOptions).then((res) => {
//                 console.log("payment initiated");
               
//             });

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className="booking">
//             <div className="booking_top d-flex align-items-center justify-content-between">
//                 <h3>Rs{price} <span>/per person</span></h3>
//                 <span className='tour_rating d-flex align-items-center'>
//                     <i className="ri-star-fill"></i>
//                     {avgRating === 0 ? null : avgRating}({reviews?.length})
//                 </span>
//             </div>
//             <div className="booking_form">
//                 <h5>Information</h5>
//                 <Form className='booking_info-form' onSubmit={handleClick}>
//                     <FormGroup>
//                         <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
//                     </FormGroup>
//                     <FormGroup>
//                         <input type="number" placeholder='Phone No.' id='phone' required onChange={handleChange} />
//                     </FormGroup>
//                     <FormGroup className='d-flex align-items-center gap-3'>
//                         <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
//                         <input type="number" placeholder='Guest' id='guestSize' required onChange={handleChange} />
//                     </FormGroup>
//                 </Form>
//             </div>

//             <div className="booking_bottom">
//                 <ListGroup>
//                     <ListGroupItem className='border-0 px-0'>
//                         <h5 className='d-flex align-items-center gap-1'>
//                             Rs{price} <i className="ri-close-line"></i>
//                             1 person</h5>
//                         <span>Rs{price}</span>
//                     </ListGroupItem>
//                     <ListGroupItem className='border-0 px-0'>
//                         <h5>Service charge</h5>
//                         <span> Rs{serviceFee}</span>
//                     </ListGroupItem>
//                     <ListGroupItem className='border-0 px-0 total'>
//                         <h5>Total</h5>
//                         <span>Rs{totalAmount}</span>
//                     </ListGroupItem>
//                 </ListGroup>
//                 <Button className='btn primary_btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
//             </div>
//         </div>
//     );
// }

// export default Booking;


import React, { useState,useEffect, useContext } from 'react';
import "../../styles/booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';



const Booking = ({ tour, avgRating }) => {
    const [token, setToken] = useState(null); // Initialize token state

    useEffect(() => {
        // Fetch the token after the component mounts
        const token = Cookies.get('token');
        console.log('Access Token: news letter', token);
        setToken(()=> token); // Set the token state
    }, []);
    const { price, reviews } = tour;
    const {user}= useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        userId: '01', // Later dynamic
        userEmail: 'xyz@gmail.com',
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    });

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const serviceFee = 10;
    let totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);
    if(user.isPremium){
totalAmount*=0.75;
    }
    else{
        totalAmount*=0.9;
    }
    const navigate = useNavigate();

    let cashfree;
    let initializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox",
        });
    };
    initializeSDK();
    const [orderId, setOrderId] = useState("");

    const getSessionId = async () => {
        try {
            const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);
            let res = await axios.post("http://localhost:4000/payment", {
                totalAmount: totalAmount,
                customer_phone: credentials.phone,
                customer_name: credentials.fullName,
                customer_email: credentials.userEmail
            });
            if (res.data && res.data.payment_session_id) {
                console.log(res.data);
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Failed to get payment session ID");
        }
    };

    const addBooking = async () => {
        try {
            const sessionId = await getSessionId();
            const checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal"
            };
            await cashfree.checkout(checkoutOptions);
            console.log("Payment initiated");
            const bookingData={
                ...credentials,tourName:tour.title
            }
            // After successful payment, add the booking
            const response = await axios.post("http://localhost:4000/api/v1/booking", bookingData,{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }});
            if (response.data.success) {
                // Booking successful, redirect or show success message
                console.log("Booking successful:", response.data);
                // Redirect or show success message
                navigate('/thank-you')
            } else {
                // Handle booking failure
                console.error("Booking failed:", response.data.msg);
                // Handle booking failure: show error message to the user
            }
        } catch (error) {
            console.error("Failed to initiate payment:", error);
            // Handle payment initiation failure
        }
    };
    ;

    return (
        <div className="booking">
            <div className="booking_top d-flex align-items-center justify-content-between">
                <h3>Rs{price} <span>/per person</span></h3>
                <span className='tour_rating d-flex align-items-center'>
                    <i className="ri-star-fill"></i>
                    {avgRating === 0 ? null : avgRating}({reviews?.length})
                </span>
            </div>
            <div className="booking_form">
                <h5>Information</h5>
                <Form className='booking_info-form' onSubmit={addBooking}>
                    <FormGroup>
                        <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input type="number" placeholder='Phone No.' id='phone' required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
                        <input type="number" placeholder='Guest' id='guestSize' required onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>

            <div className="booking_bottom">
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>
                            Rs{price} <i className="ri-close-line"></i>
                            1 person</h5>
                        <span>Rs{price}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0'>
                        <h5>Service charge</h5>
                        <span> Rs{serviceFee}</span>
                    </ListGroupItem>
                    {user.isPremium? (
                        <ListGroupItem className='border-0 px-0 total'>
                        <h5>Discount (25% off)</h5>
                        <span>-Rs{(totalAmount*0.25).toFixed(2)}</span>
                    </ListGroupItem>
                    ): <ListGroupItem className='border-0 px-0 total'>
                    <h5>Discount (10% off)</h5>
                    <span>-Rs{(totalAmount*0.1).toFixed(2)}</span>
                </ListGroupItem>}
                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Total</h5>
                        <span>Rs{totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>
                <Button className='btn primary_btn w-100 mt-4' onClick={addBooking}>Book Now</Button>

            </div>
        </div>
    );
}

export default Booking;
