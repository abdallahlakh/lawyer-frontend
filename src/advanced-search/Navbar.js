import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetchData from './Security/FetchData';

const Navbar = () => {
    const navigate = useNavigate();
    const [showManagementOptions, setShowManagementOptions] = useState(false);
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(10);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);

    useEffect(() => {
        (async () => {
            let accountRetrieved = await fetchData(navigate, setUserType, setId);
            console.log(accountRetrieved);
            
            if (!accountRetrieved) {
                accountRetrieved = await fetchData(navigate, setUserType, setId);
            }
        })();
    }, []);

    const hideNavbar = () => {
        setIsNavbarVisible(false);
    }

    const insertInfo = () => {
        if (userType === 'lawyer'){
            navigate('/insert-info-lawyer');
        } else if (userType === 'customer'){
            navigate('/insert-info-customer');
        }
    }

    const getInfo = () => {
        if (userType === 'lawyer'){
            navigate(`/lawyer-details/${id}`);
        } else if (userType === 'customer'){
            navigate(`/customer-details/${id}`);
        }       
    }

    const logoutAccount = () => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        navigate('/login');
    }

    const getAccount = async () => {
        try {
            const response = await fetch('https://djoserauthapi-1.onrender.com/api/auth/users/me/', {
                method: 'GET',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                },
            });

            if (!response.ok) {
                console.error('Failed to retrieve account');
                return;
            }

            console.log('Account retrieved successfully');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleManagementOptionsClick = () => {
        setShowManagementOptions(!showManagementOptions);
    }

    const toggleNavbar = () => {
        setIsNavbarVisible(!isNavbarVisible);
    }

    const [actionChoice, setActionChoice] = useState(null);

    const handleActionChoice = () => {
        setActionChoice(prevChoice => prevChoice === 'search' ? 'bookings' : 'search');
    }

    return (
        <div>
            <button onClick={hideNavbar} className="fixed bottom-0 right-0 m-4 p-2 bg-gray-700 text-white rounded"><i className="fas fa-times"></i></button>
            <button onClick={toggleNavbar} className="fixed right-0 top-0 m-4 p-2 bg-gray-700 text-white rounded">☰</button>
            {isNavbarVisible && (
                <div className="fixed right-0 top-0 h-screen flex flex-col justify-between items-center p-4 bg-gray-700 z-50 transition-all duration-500 ease-in-out">
                    <div className="text-white mb-8 bg-gray-700 p-2 rounded z-50">
                        {userType === 'customer' && <Link to="/my-account" className="text-white">Customer account</Link>}
                        {userType === 'lawyer' && <Link to="/my-account" className="text-white">Lawyer account</Link>}
                        <i className="fas fa-cog px-4 py-2 text-white" onClick={handleManagementOptionsClick}></i>
                        {showManagementOptions && (
                            <div className="absolute top-12 right-4 bg-black rounded shadow-lg text-left z-10 p-4 transition-all duration-500 ease-in-out">
                                <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" onClick={getAccount}>Get Account</Link>
                                <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" onClick={insertInfo}>Insert My Info</Link>
                                <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" onClick={getInfo}>Get My Info</Link>
                                <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" to="/delete-account">Delete Account</Link>
                                <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" to="/reset-password">Reset Password</Link>
                                <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" to="/change-password">Change Password</Link>
                            </div>
                        )}
                        <i className="fas fa-sign-out-alt px-4 py-2 text-white" onClick={logoutAccount}></i>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-white">
                        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handleActionChoice}>What do you want to do? <i className="fas fa-arrow-right"></i></button>
                        {actionChoice === 'search' && <Link to="/advanced-search" className="text-white">Search For Lawyers</Link>}
                        {actionChoice === 'bookings' && userType === 'customer' && <Link to="/see-bookings" className="text-white">See my bookings</Link>}
                        {actionChoice === 'missions' && userType === 'lawyer' && <Link to="/see-missions" className="text-white">See my missions</Link>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
