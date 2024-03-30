import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import fetchData from './Security/FetchData';
const Review = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [messagee, setMessagee] = useState('');
    const [customerId, setCustomerId] = useState();
    const [reviewData, setReviewData] = useState({
        lawyer_id: Number(id),
        customer_id: customerId,
        rating: rating,
        comment: comment,
    });

    const submitReview = async (event) => {
        event.preventDefault();
        let accountRetrieved = await fetchData(navigate);
        console.log(accountRetrieved);

        fetch('https://djoserauthapi-1.onrender.com/api/auth/users/me/', {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('access-token'),
            },
        })
        .then(response => response.json())
        .then(data => {
            const updatedReviewData = {
                ...reviewData,
                customer_id: data.id,
                rating: rating,
                comment: comment,
            };

            if (rating === 0) {
                setMessagee('Please enter a rating');
                return;
            }

            if (comment === '') {
                setMessagee('Please enter a comment');
                return;
            }

            setReviewData(updatedReviewData);
            fetch('https://djoserauthapi-1.onrender.com/adi/make-review/', {
                method: 'POST',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedReviewData)
            })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMessage('Review made successfully!');
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                setMessagee('Failed to make review you have already reviewed this lawyer');
            });
            
        })
        
    };

    const changeRating = (newRating) => {
        setRating(newRating);
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
    <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-green-900 text-center">Submit Review</h2>
        <div className="bg-gradient-to-r from-green-200 to-green-100 p-8 rounded-lg shadow-xl">
            <div className="flex flex-col items-center text-white space-y-4">
                <div className="w-full">
                    <label className="font-bold text-xl block text-center">Rating:</label>
                    <div className="flex justify-center">
                        <StarRatings
                            rating={rating}
                            starRatedColor="green"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name='rating'
                            starDimension="30px"
                            starSpacing="5px"
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="font-bold text-xl block text-center">Comment:</label>
                    <textarea 
                        value={comment} 
                        onChange={e => setComment(e.target.value)} 
                        className="border-2 border-white rounded-lg p-3 focus:outline-none focus:border-green-500 w-full h-20 shadow-md transition duration-500 ease-in-out hover:shadow-xl resize-none text-gray-800" 
                    />
                </div>
            </div>
            <button onClick={() => navigate(-1)} className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg self-center w-full">Back</button>
            <button onClick={submitReview} className="bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg self-center w-full">Submit Review</button>
            {message && <p className="text-green-500">{message}</p>} {/* Display the success message if it exists */}
            {messagee && <p className="text-red-500">{messagee}</p>} {/* Display the error message if it exists */}
        </div>
    </div>
</div>

    );
};

export default Review;



