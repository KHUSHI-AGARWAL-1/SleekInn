import React, { useState } from 'react';
import axios from 'axios';
import '../styles/planjourney.css';

function PlanJoruney() {
    const [destination, setDestination] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [numberOfDays, setNumberOfDays] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        let query = `plan my whole journey for ${destination} ${numberOfDays} days with ${numberOfPeople} people`;
        try {
            setLoading(true);
            const response = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCgbjy-SZQOisDM-6ueW5TLLa7UQIlWP3E',
                method: 'post',
                data: {
                    contents: [{ parts: [{ text: query }] }],
                },
            });

            const fetchedAnswer = response.data.candidates[0].content.parts[0].text;
            const formattedText = fetchedAnswer
                .replace(/\*\*/g, '')
                .replace(/\d+\*/g, '')
                .replace(/^\*\s+/gm, '');

            setAnswer(formattedText.trim());
            console.log(formattedText);

        } catch (error) {
            setAnswer('Sorry - Something went wrong. Please try again!');
            console.error('Error fetching answer:', error);
        }
        finally {
            setDestination('');
            setNumberOfDays('');
            setNumberOfPeople('');
            setLoading(false);
        }
    }

    return (
        <div className="plan-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Your Destination'
                    value={destination}
                    required
                    onChange={(e) => setDestination(e.target.value)}
                    className='input-field'
                />
                <input
                    type="number"
                    placeholder='No. of people'
                    required
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    className='input-field'
                />
                <input
                    type="number"
                    required
                    placeholder='No. of days'
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(e.target.value)}
                    className='input-field'
                />
                <button type='submit' className="submit-button">Plan</button>
            </form>
            {loading && <p className="loading-text">Planning your Journey...</p>}
            {!loading && answer && (
                <div>
                    <h2 className="message">Your Itinerary:</h2>
                    <div className="itinerary" style={{ whiteSpace: 'pre-wrap' }}>{answer}</div>
                </div>
            )}
            {!loading && !answer && <p className="loading-text">Please submit your plan to generate the itinerary.</p>}
        </div>
    );
}

export default PlanJoruney;
