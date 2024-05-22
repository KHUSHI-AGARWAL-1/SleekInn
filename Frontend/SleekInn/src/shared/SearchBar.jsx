import React,{useRef} from 'react'
import '../styles/searchBar.css'
import{Col,Form,FormGroup} from 'reactstrap'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'


function SearchBar() {

    const locationRef = useRef('')
    const distanceRef = useRef('0')
    const maxSizeRef = useRef('0')
    const navigate = useNavigate()

    const searchHandler =async ()=>{
        const location = locationRef.current.value
        const distance = distanceRef.current.value
        const maxGroup = maxSizeRef.current.value

        if(location ==='' || distance ===''|| maxGroup ===''){
            return alert('All fields are required!!!')
        }

        const res = await fetch(`${BASE_URL}/tours/getsearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroup}`)

        if(!res.ok) alert('Something went wrong')

        const result = await res.json(); 
        
        navigate(`/tours/getsearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroup}`,{state: result.data})
    }
  return (
    <Col lg='12'>
        <div className='searchBar'>
            <Form className='d-flex align-itema11111s-center gap-4'>
                <FormGroup className='d-flex gap-3 form_group form_group-fast'>
                    <span><i class="ri-map-pin-line"></i></span>
                    <div>
                        <h6>Location</h6>
                        <input type="text" placeholder='Where are you going?' ref={locationRef}/>
                    </div>
                </FormGroup>

                <FormGroup className='d-flex gap-3 form_group form_group-fast'>
                    <span><i class="ri-map-pin-time-fill"></i></span>
                    <div>
                        <h6>Distance</h6>
                        <input type="number" placeholder='Distance k/m' ref={distanceRef}/>
                    </div>
                </FormGroup>
               
                <FormGroup className='d-flex gap-3 form_group form_group-last'>
                    <span><i class="ri-group-line"></i></span>
                    <div>
                        <h6>Max People</h6>
                        <input type="text" placeholder='0' ref={maxSizeRef} />
                    </div>
                </FormGroup>

                <span className='search-icon' type='submit' onClick={searchHandler}>
                <i class="ri-search-line"></i>
                </span>
            </Form>
        </div>
    </Col>
  )
}

export default SearchBar