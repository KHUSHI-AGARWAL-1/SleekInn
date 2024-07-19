
import React from 'react';
import '../styles/aboutUs.css';
import kashish from './../assets/images/kashish.jpeg'
import khushi from './../assets/images/khushi.jpeg'

function AboutUs() {
    return (
        <div>
            <main>
                <section className='section'>
                    <h2 className="headings">Our Mission</h2>
                    <p>
                        At Our SleekInn, our mission is to empower travelers with a comprehensive and user-friendly platform for discovering the wonders of the world. Whether you're an avid explorer, a wanderlust-driven adventurer, or simply someone curious about travel, we're here to enhance your understanding and appreciation of diverse destinations and experiences.
                    </p>
                </section>

                <section className='section'>
                    <h2 className="headings">What We Offer</h2>
                    <p><strong>Discover Destinations:</strong> Enter any location into our intuitive search bar and unlock a wealth of information about captivating destinations worldwide. <br /><strong>Adventure Awaits: </strong>Unleash your creativity and imagination by discovering rhyming words effortlessly, adding a poetic flair to your travel stories and experiences. </p>

                </section>

                <section className='section'>
                    <h2 className="headings">Our Commitment</h2>
                    <p> 
                        <strong>Authenticity:</strong> We guarantee that the information provided on our platform is authentic and verified, so you can plan your travels with confidence.
                        <br />
                        <strong>Accessibility:</strong> Our platform is designed to be accessible to all users, regardless of their background or level of expertise in travel, ensuring that everyone can benefit from our resources.

                         </p>
                </section>

                <section className='meetus'>
                    <h2 className="headings">Meet the Team</h2>
                    <div className="team">
                        <div className="team-member">
                            <img src={kashish} alt="Team Member 1" className="img-fluid rounded-circle mb-3" style={{ width: '150px' }} />
                            <h4>Kashish Bansal</h4>
                            <p>Frontend Developer</p>
                        </div>
                        <div className="team-member">
                            <img src={khushi} alt="Team Member 2" className="img-fluid rounded-circle mb-3" style={{ width: '150px' }} />
                            <h4>Khushi Agrawal</h4>
                            <p>Backend Developer</p>
                        </div>
                    </div>
                </section>

                <section className='section'>
                    <h2 className="headings">Contact Us</h2>
                    <p>
                        We would love to hear from you! Whether you have suggestions, questions, or just want to say hello, feel free to reach out to us at <a href="mailto:contact@SleekInn.com">contact@SleekInn.com</a>.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default AboutUs;