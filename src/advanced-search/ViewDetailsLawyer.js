import React, { useEffect,useState } from 'react';
import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import 

import fetchData from './Security/FetchData';
const ViewDetailsLawyer = () => {
    const { id } = useParams();
    const [lawyerDetails, setLawyerDetails] = useState(null);
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);
    const [idd, setId] = useState(10);
    
    useEffect(() => {
        (async () => {
            if (!lawyerDetails) {
                let accountRetrieved = await fetchData(navigate, setUserType, setId);
                console.log(accountRetrieved);
    
                if(!accountRetrieved) {
                    accountRetrieved = await fetchData(navigate, setUserType, setId);
                }
                if(accountRetrieved) {
                    const fetchLawyerDetails = async () => {
                        
                        try {
                            const response = await axios.get(`http://localhost:8000/adi/lawyer-detail/${id}/`, {
                                headers: {
                                    'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                                },
                            });
                       
                            setLawyerDetails(response.data);
                        } catch (error) {
                            console.error('Error fetching lawyer details:', error);
                        }
                    };
                    fetchLawyerDetails();
                }
            }
        })();
    }, [id, lawyerDetails]);

    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-green-900">Lawyer Details</h2>
            <button onClick={() => navigate(-1)} className="bg-red-600 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg self-center text-base">Back</button>
        </div>
        {lawyerDetails ? (
            <div className="flex flex-col items-center">
                <img src={lawyerDetails.photo} alt={lawyerDetails.name} className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover mb-4" />
                <div className="text-gray-800">
                    <p className="mb-2"><strong>Name:</strong> {lawyerDetails.name}</p>
                    <p className="mb-2"><strong>Email:</strong> {lawyerDetails.email}</p>
                    <p className="mb-2"><strong>Phone:</strong> {lawyerDetails.phone}</p>
                    <p className="mb-2"><strong>Location:</strong> {lawyerDetails.location}</p>
                    <p className="mb-2"><strong>Rating:</strong> {lawyerDetails.average_rating}</p>
                    {/* Add more details as needed */}
                </div>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
</div>
    );
};

export default ViewDetailsLawyer;