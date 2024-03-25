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
    
    return (<div className="container mx-auto px-4 py-8">
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-black">Your Bookings</h2>
        <button onClick={() => navigate(-1)} className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg">Back</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length > 0 ? (
            bookings.map(booking => (
                <div key={booking.id} className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                    <button 
                        onClick={() => deleteBooking(booking.id)} 
                        className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                    >
                        X
                    </button>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-black">Booking ID: {booking.id}</h3>
                        <p className="text-black">Date: {booking.date}</p>
                        <p className="text-black">Time From: {booking.time_from}</p>
                        <p className="text-black">Time To: {booking.time_to}</p>
                        <p className="text-black">Lawyer: {booking.lawyer}</p>
                        <p className="text-black">State: {booking.state}</p>
                    </div>
                    <div className="p-6 flex justify-center space-x-4 items-center">
                        <Link 
                            to={`/lawyer-details/${booking.lawyer}`} 
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            See Lawyer
                        </Link>
                        <select 
                            id={`state-${booking.id}`} 
                            className="border-2 border-black-500 text-black-700 bg-gray-100 hover:border-black-700 focus:border-white-700 h-10 pl-5 pr-10 hover:bg-gray-200 focus:outline-none appearance-none shadow-md cursor-pointer"
                        >
                            <option value="" disabled selected>Update the state</option>
                            <option value="REQUESTED" className="py-1 text-black-700">Requested</option>
                            <option value="CANCELLED" className="py-1 text-black-700">Cancelled</option>
                        </select>
                        <button 
                            onClick={() => updateBookingState(booking.id)} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Update State
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-black text-center">You have no bookings.</p>
        )}
    </div>
</div>
    );
};

export default SeeBooking;