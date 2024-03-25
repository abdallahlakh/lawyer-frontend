import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios library
import fetchData from './Security/FetchData';
const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [message, setMessage] = useState(''); // New state variable for the success message
    const [messagee, setMessagee] = useState(''); // New state variable for the success message

    const [customerId, setCustomerId] = useState();
    const [date, setDate] = useState('');
    const [bookingData, setBookingData] = useState({
        lawyer_id: id,
        customer_id: customerId,
        time_from: timeFrom,
        time_to: timeTo,
        date: date,
    });
    
    const deleteBooking = (id) => {
        fetch(`http://127.0.0.1:8000/api/bookings/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('access-token'),
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // If the deletion was successful, update the state or refetch the bookings
            // You need to implement this part based on your application's needs
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
    const [showManagementOptions, setShowManagementOptions] = useState(false);
    const [userType, setUserType] = useState(null);
    const [idd, setId] = useState(10);
    
    
    const makebooking = async (event) => {
        let accountRetrieved = await fetchData(navigate, setUserType, setId);
        console.log(accountRetrieved);
        
        event.preventDefault();
        fetch('http://127.0.0.1:8000/api/auth/users/me/', {
    method: 'GET',
    headers: {
        'Authorization': 'JWT ' + localStorage.getItem('access-token'),
    },
})
.then(response => response.json()) // Add this line
.then(data => {
    console.log(data);
    const updatedBookingData = {
        ...bookingData,
        customer_id: data.id, // Change this line
        time_from: timeFrom,
        time_to: timeTo,
        date: date,
    };
    if (timeFrom === '') {
        setMessagee('Please enter a time from');
        return;
    }
    if (timeTo === '') {
        setMessagee('Please enter a time to');
        return;
    }
    if(timeFrom >= timeTo){
        setMessagee('Time from should be less than time to');
        return;
    }

    if (date === '') {
        setMessagee('Please enter a date');
        return;
    }

    setBookingData(updatedBookingData);

    axios.post('http://127.0.0.1:8000/adi/make-booking/', updatedBookingData, {
        headers: {
            'Authorization': 'JWT ' + localStorage.getItem('access-token'),
        },
    })
    .then(response2 => {
        if (response2.status === 200) {
            setMessage('Booking made successfully!'); // Set the success message
        }
        else {
            setMessagee('Failed to make booking');
        }
        console.log(response2.data);
    })
    .catch(error => {
        console.error(error);
    });
})
.catch(error => {
    console.error(error);
});   
    };   

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
    <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-green-900 text-center">Make Booking</h2>
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            {/* Rest of your code... */}
            <div className="flex flex-col text-gray-800 space-y-4">
                <div className="flex flex-col items-center space-y-2">
                    <label className="font-bold text-lg">Time From:</label>
                    <input type="time" value={timeFrom} onChange={e => setTimeFrom(e.target.value)} className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-500 w-full" />
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <label className="font-bold text-lg">Time To:</label>
                    <input type="time" value={timeTo} onChange={e => setTimeTo(e.target.value)} className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-500 w-full" />
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <label className="font-bold text-lg">Date:</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-500 w-full" />
                </div>
       
            </div>
            <button onClick={makebooking} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg mt-4">Make Booking</button>
            
            <button onClick={() => {navigate(-1)}} className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg mt-4">Back</button>
            {messagee && <p className="text-red-500">{messagee}</p>} {/* Display the error message if it exists */}
            {message && <p className="text-green-500">{message}</p>} {/* Display the success message if it exists */}

        </div>
    </div>
</div>
    );
};

export default Booking;
