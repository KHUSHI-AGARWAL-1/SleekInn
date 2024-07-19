import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../styles/newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';

function Newsletter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [token, setToken] = useState(null); // Initialize token state

    useEffect(() => {
        const token = Cookies.get('token');
        console.log('Access Token: news letter', token);
        setToken(()=> token); 
    }, []); 

    const subscribe = async () => {
        try {
            console.log(token +" yeh hain");
            if (!token) {
                console.error('Access token not available');
                return;
            }
            
            const response = await fetch('http://localhost:4000/api/v1/setPremium', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email: email }),
            });
            const res= await response.json();
            console.log(res)
            if (response.ok) {
                setSubscribed(true);
                console.log("done subs")
            } else {
                console.error('Subscription failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error subscribing:', error.message);
        }
    };
    return (
        <section className='newsletter'>
            <Container>
                <Row>
                    <Col lg='6'>
                        <div className="newsletter_content">
                            {subscribed ? (
                                <h2>Thank you for subscribing!</h2>
                            ) : (
                                <>
                                    <h2>Subscribe to get useful traveling information.</h2>
                                    <div className="newsletter_input">
                                        <input
                                            type="email"
                                            placeholder='Enter your email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <button className='btn newsletter_btn' onClick={subscribe}>Subscribe</button>
                                    </div>
                                    <p>Connect with us for any information and Let's explore the world together for an exciting experience.</p>
                                </>
                            )}
                        </div>
                    </Col>
                    <Col>
                        <div className="newsletter_img">
                            <img src={maleTourist} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Newsletter;