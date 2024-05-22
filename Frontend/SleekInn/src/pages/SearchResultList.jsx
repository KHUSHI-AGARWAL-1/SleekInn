import React, { useState } from 'react'
import CommonSection from '../shared/CommonSection'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import Tourcard from '../shared/Tourcard'
import Newletter from '../shared/Newletter'

function SearchResultList() {
  const location = useLocation();

  const[data] = useState(location.state)

  console.log(data)
  return (
    <>
    <CommonSection title={"Tour Search Result"}/>
      <section>
        <Container>
          <Row>
            {
              data.length ===0 ?(
                 <h3>No tour found</h3>
                 ) : ( data?.map(tour=> (
                 <Col lg='3' className='mb-4' key={tour._id}>
                {" "}
                  <Tourcard tour={tour}/> {" "}
              </Col>
              )))
            }

          </Row>
        </Container>
      </section><Newletter/>
    </>
  )
}

export default SearchResultList