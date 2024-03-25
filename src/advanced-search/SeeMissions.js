import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios library
import { useNavigate, Link } from 'react-router-dom';

import fetchData from './Security/FetchData';

const SeeMissions = () => {
    const [missions, setMissions] = useState([]); // State to store the bookings
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(10);
    function deleteBooking(id) {
        fetch(`http://127.0.0.1:8000/adi/delete-booking/${id}/`, {
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


    const updateMissionState = async (missionId) => {
        let accountRetrieved = await fetchData(navigate, setUserType, setId);
        console.log(accountRetrieved);
        
        const selectedState = document.getElementById(`state-${missionId}`).value;

        try {
            const response = await axios.put(`http://127.0.0.1:8000/adi/update-mission/${missionId}/`, {
                state: selectedState,
            }, {
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                },
            });

            // If the request was successful, update the missions in the state
            if (response.status === 200) {
                setMissions(missions.map(mission => mission.id === missionId ? {...mission, state: selectedState} : mission));
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
        // Function to fetch missions
        const fetchMissions = async () => {
            axios.get(`http://127.0.0.1:8000/adi/see-missions/${id}/`, {
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                },
            })
            .then(response => {
                setMissions(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        };

        // Call the function to fetch missions
        fetchMissions();
    }, [id]);
    
    return (
        <div className="container mx-auto px-4 py-8">
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-black">Your Missions</h2>
        <button onClick={() => navigate(-1)} className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg">Back</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.length > 0 ? (
            missions.map(mission => (
                <div key={mission.id} className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                    <button 
                        onClick={() => deleteBooking(mission.id)} 
                        className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                    >
                        X
                    </button>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-black">mission ID: {mission.id}</h3>
                        <p className="text-black">Date: {mission.date}</p>
                        <p className="text-black">Time From: {mission.time_from}</p>
                        <p className="text-black">Time To: {mission.time_to}</p>
                        <p className="text-black">Lawyer: {mission.lawyer}</p>
                        <p className="text-black">State: {mission.state}</p>
                    </div>
                    <div className="p-6 flex justify-center space-x-4 items-center">
                        <Link 
                            to={`/customer-details/${mission.customer}`} 
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            See Customer
                        </Link>
                        <select 
                            id={`state-${mission.id}`} 
                            className="border-2 border-black-500 text-black-700 bg-gray-100 hover:border-black-700 focus:border-white-700 h-10 pl-5 pr-10 hover:bg-gray-200 focus:outline-none appearance-none shadow-md cursor-pointer"
                        >
                                    <option value="" disabled selected>Update the state</option>
                                    <option value="CONFIRMED">Confirmed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="RESCHEDULED">Rescheduled</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="NO_SHOW">No Show</option>
                                    <option value="IN_PROGRESS">In Progress</option>
   
                            
                         </select>
                        <button 
                            onClick={() => updateMissionState(mission.id)} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Update State
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-black text-center">You have no missions.</p>
        )}
    </div>
</div>
    );
};

export default SeeMissions;