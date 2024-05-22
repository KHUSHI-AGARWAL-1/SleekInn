import React, { useEffect, useState } from 'react'

const Mybooking = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchD = async ()=>{
            const res= await fetch(`${BASE_URL}/user/update/${user._id}`,{
                headers: {Authorization : `Bearer ${token}`}
            })
        }
    })

    return (
    <div>
      UseFetchData
    </div>
  )
}

export default Mybooking
