import React, { useEffect,useState } from 'react';
import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import 

import fetchData from './Security/FetchData';

const ViewDetailsCustomer = () => {
    const [customerDetails, setCustomerDetails] = useState(null);
    const navigate = useNavigate();
   
    const { id } = useParams();
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
                const fetchCustomerDetails = async () => {
                    try {
                        const response = await axios.get(`https://djoserauthapi-1.onrender.com/adi/customer-detail/${id}/`, {
                            headers: {
                                'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                            },
                        });
                        setCustomerDetails(response.data);
                    } catch (error) {
                        console.error('Error fetching customer details:', error);
                    }
                };
    
                fetchCustomerDetails();
            }
        })();
    }, [id]);
    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-green-900">Customer Details</h2>
            <button onClick={() => navigate(-1)} className="bg-red-600 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg self-center text-base">Back</button>
        </div>
        {customerDetails ? (
            <div className="flex flex-col items-center">
                <img src={customerDetails.photo} alt={customerDetails.name} className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover mb-4" />
                <div className="text-gray-800">
                    <p className="mb-2"><strong>Name:</strong> {customerDetails.name}</p>
                    <p className="mb-2"><strong>Email:</strong> {customerDetails.email}</p>
                    <p className="mb-2"><strong>Phone:</strong> {customerDetails.phone}</p>
                    <p className="mb-2"><strong>Location:</strong> {customerDetails.location}</p>
                </div>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
</div>
    );
};

export default ViewDetailsCustomer;
