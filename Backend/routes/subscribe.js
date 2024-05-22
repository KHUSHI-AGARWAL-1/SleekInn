


//     const express = require('express');
// const router = express.Router();
// const crypto = require('crypto');
// const { Cashfree } = require('cashfree-pg');

// require("dotenv").config();

// Cashfree.XClientId = process.env.CLIENT_ID;
// Cashfree.XClientSecret = process.env.CLIENT_SECRET;
// Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// function generateOrderId() {
//     const uniqueId = crypto.randomBytes(16).toString('hex');
//     const hash = crypto.createHash('sha256');
//     hash.update(uniqueId);
//     const orderId = hash.digest('hex');
//     return orderId.substr(0, 12);
// }

// router.post('/susbcribe', async (req, res) => {
//     try {
       
       
//         let request = {
//             "order_amount": 10,
//             "order_currency": "USD",
//             "order_id": await generateOrderId(),
//             "customer_details": {
//                 "customer_id": "webcodder01",
//                 "customer_phone": "9999999999",
//                 "customer_name": "Web Codder",
//                 "customer_email": "webcodder@example.com"
//             },

//         } 
//         Cashfree.PGCreateOrder("2023-08-01", request).then(response => {
//             console.log(response.data);
//             res.json(response.data);
//         }).catch(error => {
//             console.log(error.response.data.message);
//             res.status(500).json({ error: error.response.data.message });
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Server Error' });
//     }
// });

// module.exports = router;
