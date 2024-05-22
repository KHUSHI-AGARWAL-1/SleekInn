import React from 'react'
import TourCard from '../../shared/Tourcard'
import { Col } from 'reactstrap'

import { BASE_URL } from './../../utils/config'
import useDfetch from './../../hooks/useDfetch'

const FeaturedTourList = () => {
  const { data: featuredTours, loading, error } = useDfetch(`${BASE_URL}/tours/getfeatured`)
  // console.log(featuredTours)
  return (
    <>
      {
        loading && <h4>Loading..........</h4>
      }
      {
        error && <h4>{error}</h4>
      }
      {!loading && !error && featuredTours?.map(tour => (
        <Col lg="3" className="mb-4" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  )
}

export default FeaturedTourList