import React from 'react'
import ServiceCard from './ServiceCard';
import {Col} from "reactstrap";


import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customozationImg from '../assets/images/customization.png'

const servicesData = [
    {
        imgUrl : weatherImg,
        title: "Calculate Weather",
        desc: "Your destination, your weather—always on point.."
    },
    {
        imgUrl : guideImg,
        title: "Best tour Guide",
        desc: "Our expert tour guides turn every trip into an unforgettable adventure."
    },
    {
        imgUrl : customozationImg,
        title: "Customization",
        desc:"Craft your perfect getaway with our personalized travel solutions."
    }
]

const ServiceList = () => {

  return (
    <>
     {
        servicesData.map((item,index)=> (
        <Col lg='3' key={index}>
            <ServiceCard item={item}/>
        </Col>
        ))} 
    </>
  )
}

export default ServiceList
