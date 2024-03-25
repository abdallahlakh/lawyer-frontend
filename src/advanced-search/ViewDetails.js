import React, { useEffect, useState } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios library
import StarRatings from 'react-star-ratings';
import fetchData from './Security/FetchData';
const ViewDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customerId] = useState();
    const [lawyerDetails, setLawyerDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [time] = useState('');
    const [date] = useState('');
    const [] = useState({
        lawyer_id: id,
        customer_id: customerId,
        time: time,
        date: date,
    });
    const [userType, setUserType] = useState(null);
    const [idd, setId] = useState(10);
    useEffect(() => {
        (async () => {
            let accountRetrieved = await fetchData(navigate, setUserType, setId);
            console.log(accountRetrieved);
    
            if(!accountRetrieved) {
                accountRetrieved = await fetchData(navigate, setUserType, setId);
            }
    
            if(accountRetrieved) {
                const fetchLawyerDetails = async () => {
                    try {
                        const response = await axios.get(`https://djoserauthapi-1.onrender.com/adi/lawyer-detail/${id}/`, {
                            headers: {
                                'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                            },
                        });
                        setLawyerDetails(response.data);
                    } catch (error) {
                        console.error('Error fetching lawyer details:', error);
                    }
                };
    
                const fetchReviews = async () => {
                    try {
                        const response = await axios.get(`https://djoserauthapi-1.onrender.com/adi/reviews/${id}/`, {
                            headers: {
                                'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                            },
                        });
                        setReviews(response.data);
                    } catch (error) {
                        console.error('Error fetching reviews:', error);
                    }
                };
    
                fetchLawyerDetails();
                fetchReviews();
            }
        })();
    }, [id, navigate]);
    return (
        <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold mb-6 text-green-900">Lawyer Details</h2>
                <button onClick={() => navigate(-1)} className="bg-red-600 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg self-center text-base">Back</button>
            </div>
            {lawyerDetails ? (
                <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
                    <img src={lawyerDetails.photo} alt={lawyerDetails.name} className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover mb-4" />
                    <div className="text-gray-800">
                        <p className="mb-2"><strong>Email:</strong> {lawyerDetails.email}</p>
                        <p className="mb-2"><strong>Phone:</strong> {lawyerDetails.phone}</p>
                        <p className="mb-2"><strong>Location:</strong> {lawyerDetails.location}</p>
                        <p className="mb-2"><strong>Latitude:</strong> {lawyerDetails.lat}</p>
                        <p className="mb-2"><strong>Longitude:</strong> {lawyerDetails.lng}</p>
                        <p className="mb-2"><strong>Rating:</strong> {lawyerDetails.average_rating}</p>
                        <p className="mb-2"><strong>Languages:</strong> {lawyerDetails.languages.join(', ')}</p>
                        <p className="mb-2"><strong>Specialities:</strong> {lawyerDetails.specialities.join(', ')}</p>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
                        <Link to={`/make-booking/${id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg">Make Booking</Link>
                        <Link to={`/make-review/${id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg">Make Review</Link>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading lawyer details...</p>
            )}
        </div>
        <h2 className="text-3xl font-bold mb-6 text-green-900 mt-8 text-center">Reviews:</h2>
        <div className="max-w-md mx-auto">
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4">
                        <StarRatings
                            rating={review.rating}
                            starDimension="20px"
                            starSpacing="2px"
                            starRatedColor="green"
                            numberOfStars={5}
                            name='rating'
                        />
                        <p className="text-center"><strong>User:</strong> {review.customer_name}</p>
                        <p className="text-center"><strong>Comment:</strong> {review.comment}</p>
                        <p className="text-center"><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                        <p className="text-center"><strong>Time:</strong> {new Date('1970-01-01T' + review.time + 'Z').toLocaleTimeString()}</p>
                    </div>
                ))
            ) : (
                <p className="text-center">No reviews yet...</p>
            )}
        </div>
    </div>
    );
};

export default ViewDetails;
