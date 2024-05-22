import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/tours-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../Components/Booking/Booking';
import Newletter from '../shared/Newletter';
import useDfetch from '../hooks/useDfetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from './../context/AuthContext'
function TourDetails() {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTotalRating] = useState(null);
  const { user } = useContext(AuthContext)

  // fetching data from server
  const { data: tour, loading, error } = useDfetch(`${BASE_URL}/tours/get/${id}`)

  if (!tour) {
    // Handle case where tour is not found
    return <div>Tour not found</div>;
  }

  // Destructure prop from tour obj
  const { photo, title, desc, price, reviews, city, distance, address, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // Format date
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // Submit req to server
  const submitHandler = async e => {
    // e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert('Please SignIn First')
        
      }
      const reviewObj = {
        username: user?.username,
        review:reviewText,
        rating: tourRating
      }
      console.log(reviewObj)

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj)
      })
      const result = await res.json()
      if (!res.ok) {
        return alert(result.msg)
      }
     alert(result.msg)
    } catch (err) {
      alert(err.msg)
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tour])
  return (
    <>
      <section>
        <Container>

          {loading && <h4 className='text-center pt-5'>Loading.....</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          {
            !loading && !error && (
              <Row>
                <Col lg="8">
                  <div className="tour_content">
                    <img src={photo} alt="" />
                    <div className="tour_info">
                      <h2>{title}</h2>
                      <div className="d-flex align-items-center gap-5">
                        <span className="tour_rating d-flex align-items-center gap-1">
                          <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
                          {avgRating === 0 ? null : avgRating}
                          {totalRating === 0 ? 'Not Rated' : <span>({reviews?.length})</span>}
                        </span>

                        <span>
                          <i className="ri-map-pin-user-fill"></i>
                          {address}
                        </span>
                      </div>
                      <div className="tour_extra_detail">
                        <span>
                          <i className="ri-map-pin-2-line"></i>
                          {city}
                        </span>

                        <span>
                          <i className="ri-money-dollar-circle-line"></i>${price} /per person
                        </span>

                        <span>
                          <i className="ri-map-pin-line"></i>
                          {distance} k/m
                        </span>

                        <span>
                          <i className="ri-group-line"></i>
                          {maxGroupSize} people
                        </span>
                      </div>
                      <h5>Description</h5>
                      <p>{desc}</p>
                    </div>

                    <div className="tour_reviews mt-4">
                      <h4>Reviews ({reviews?.length} reviews)</h4>

                      <Form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                          <span onClick={() => setTotalRating(1)}>
                            1<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTotalRating(2)}>
                            2<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTotalRating(3)}>
                            3<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTotalRating(4)}>
                            4<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTotalRating(5)}>
                            5<i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <div className="review_input">
                          <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
                          <button className="btn primary_btn text-white" type="submit">
                            Submit
                          </button>
                        </div>
                      </Form>
                      <ListGroup className="user_reviews">
                        {reviews?.map(review => (
                          <div className="review_item" key={review.id}>
                            <img src={avatar} alt="" />
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5>{review.username}</h5>
                                  <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                                </div>

                                <span className="d-flex align-items-center">
                                  {review.rating} <i className="ri-star-s-fill"></i>
                                </span>
                              </div>
                              <h6>{review.review}</h6>
                            </div>
                          </div>
                        ))}
                      </ListGroup>
                    </div>
                  </div>
                </Col>

                <Col lg="4">
                  <Booking tour={tour} avgRating={avgRating} />

                </Col>
              </Row>
            )
          }
        </Container>
      </section>
      <Newletter />
    </>
  );
}

export default TourDetails;
