import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios library
import { useNavigate, Link } from 'react-router-dom';

import fetchData from './Security/FetchData';


const SeeBooking = () => {
    
    const [bookings, setBookings] = useState([]); // State to store the bookings
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(10);
    function deleteBooking(id) {
        fetch(`https://djoserauthapi-1.onrender.com/adi/delete-booking/${id}/`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Here you might want to update your state to reflect the deletion
    
            // Reload the page
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const updateBookingState = async (bookingId) => {
        let accountRetrieved = await fetchData(navigate, setUserType, setId);
        console.log(accountRetrieved);
        
        const selectedState = document.getElementById(`state-${bookingId}`).value;

        try {
            const response = await axios.put(`https://djoserauthapi-1.onrender.com/adi/update-booking/${bookingId}/`, {
                state: selectedState,
            }, {
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                },
            });

            // If the request was successful, update the bookings in the state
            if (response.status === 200) {
                setBookings(bookings.map(booking => booking.id === bookingId ? {...booking, state: selectedState} : booking));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            let accountRetrieved = await fetchData(navigate, setUserType, setId);
            console.log(accountRetrieved);
           
            if(accountRetrieved) {
                return;
            }
            if(!accountRetrieved) {
                accountRetrieved = await fetchData(navigate, setUserType, setId);
                return;
            }
        })();
    }, []);

    useEffect(() => {
        // Function to fetch bookings
        const fetchBookings = async () => {
            axios.get(`https://djoserauthapi-1.onrender.com/adi/see-bookings/${id}/`, {
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                },
            })
            .then(response => {
                setBookings(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        };

        // Call the function to fetch bookings
        fetchBookings();
    }, [id]);
    
    return (
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Your Bookings</h2>
                <button onClick={() => navigate(-1)} className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg">Back</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.length > 0 ? (
                    bookings.map(booking => (
                        <div key={booking.id} className="bg-gray-200 rounded-lg overflow-hidden shadow-lg relative">
                            <button 
                                onClick={() => deleteBooking(booking.id)} 
                                className="absolute top-0 right-0 m-2 bg-gray-600 hover:bg-gray-400 text-white font-bold py-1 px-2 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                            >
                                X
                            </button>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">Booking ID: {booking.id}</h3>
                                <p className="text-gray-900">Date: {booking.date}</p>
                                <p className="text-gray-900">Time From: {booking.time_from}</p>
                                <p className="text-gray-900">Time To: {booking.time_to}</p>
                                <p className="text-gray-900">Lawyer: {booking.lawyer}</p>
                                <p className="text-gray-900">State: {booking.state}</p>
                            </div>
                            <div className="p-6 flex justify-center space-x-4 items-center">
                                <Link 
                                    to={`/lawyer-details/${booking.lawyer}`} 
                                    className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                                >
                                    See Lawyer
                                </Link>
                                <select 
                                    id={`state-${booking.id}`} 
                                    className="border-2 border-gray-900 text-gray-900 bg-white hover:border-gray-700 focus:border-gray-700 h-10 pl-5 pr-10 hover:bg-gray-200 focus:outline-none appearance-none shadow-md cursor-pointer"
                                >
                                    <option value="" disabled selected>Update the state</option>
                                    <option value="REQUESTED" className="py-1 text-gray-900">Requested</option>
                                    <option value="CANCELLED" className="py-1 text-gray-900">Cancelled</option>
                                </select>
                                <button 
                                    onClick={() => updateBookingState(booking.id)} 
                                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                                >
                                    Update State
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-900 text-center">You have no bookings.</p>
                )}
            </div>
        </div>
    );
};

export default SeeBooking;
