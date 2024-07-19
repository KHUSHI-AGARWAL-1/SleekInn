import React from 'react'

const Payment = () => {
    let cashfree;
  let initializeSDK = async function(){
    cashfree=await load({
      mode:"sandbox",
    })
  }
  initializeSDK()
  const[orderId,setOrderId]=useState("")
   const getSessionId= async ()=>{
   
    try {
      let res = await axios.get("http://localhost:8000/payment")
      if(res.data && res.data.payment_session_id){
        console.log(res.data)
        setOrderId(res.data.order_id)
        return res.data.payment_session_id
      }
     
    } catch (error) {
      console.log(error)
    }

  }
   
  const verifyPayment = async()=>{
try {
  let res= await axios.post("http://localhost:8000/verify",{
    orderId:orderId,
  })
  if(res && res.data){
    console.log("verified")
    alert('Payment verified')
  }
} catch (error) {
  console.log(error)
}
  }

  const handleClick= async (e)=>{
    e.preventDefault()
    try {
      let sessionId = await getSessionId()
      let checkoutOptions={
        paymentSessionId:sessionId,
        redirectTarget:"_modal"

      }
cashfree.checkout(checkoutOptions).then((res)=>{
  console.log("payment initiated")
  verifyPayment(orderId)
})
    } catch (error) {
      console.log(error)
      
    }

  }
  return (
    <div>
      
    </div>
  )
}

export default Payment
