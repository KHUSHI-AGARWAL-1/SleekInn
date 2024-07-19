import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'
const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {

                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            }
        ]
    }

    return <Slider {...settings}>
        <div className='testimonial py-4 px-3'>
            <p>Thrilled adventurers rave about their unforgettable experiences with SleekInn. From breathtaking destinations to seamless travel arrangements, our fans testify to a world of wanderlust fulfilled.</p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
                <div>
                    <h6 className="mb-0 mt-3">John Doe</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>

        <div className='testimonial py-4 px-3'>
            <p>Discover why our users rave about us! Read firsthand reviews that paint a vivid picture of unforgettable adventures with SleekInn. Your passport to exceptional travel awaits!.</p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Levis Patie</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>

        <div className='testimonial py-4 px-3'>
            <p>Join the chorus of delighted travelers who've chosen SleekInn for their journeys. Explore authentic reviews showcasing the joy, ease, and magic our users have experienced. </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
                <div>
                    <h6 className="mb-0 mt-3">Mark stieve</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
    </Slider>


}

export default Testimonials
