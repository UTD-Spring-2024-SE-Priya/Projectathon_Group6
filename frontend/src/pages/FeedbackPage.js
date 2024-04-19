// FeedbackPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackPage.css'; // Ensure this CSS file has the updated class names

const FeedbackPage = () => {
    const [feedback, setFeedback] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(null); // 'good' or 'bad'
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Construct feedback info, but we'll skip the API call for now
        navigate(-1); // This will take the user back to the previous page
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="top-bar"></div>
            <div className="feedback-container">
                <div className="feedback-title">Submit <span id= "highlightB" >feedback</span> on the idea!</div>
                <div className="feedback-group">
                    <label htmlFor="feedback">Feedback</label>
                    <input
                        type="text"
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
                <div className="feedback-group">
                    <label>Was the idea good or bad?</label>
                    <div className="feedback-rating">
                        <button
                            type="button"
                            onClick={() => setFeedbackRating('good')}
                            className={feedbackRating === 'good' ? 'feedback-button-active' : 'feedback-button'}
                        >
                            👍
                        </button>
                        <button
                            type="button"
                            onClick={() => setFeedbackRating('bad')}
                            className={feedbackRating === 'bad' ? 'feedback-button-active' : 'feedback-button'}
                        >
                            👎
                        </button>
                    </div>
                </div>
                <div className="feedback-group">
                    <input type="submit" value="Submit" />
                </div>
            </div>
        </form>
    );
};

export default FeedbackPage;
