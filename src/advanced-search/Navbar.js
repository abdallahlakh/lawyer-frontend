import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetchData from './Security/FetchData';
const Navbar = () => {
    const navigate = useNavigate();
    const [showManagementOptions, setShowManagementOptions] = useState(false);
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(10);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);


    useEffect(() => {
        (async () => {
            let accountRetrieved = await fetchData(navigate, setUserType, setId);
            console.log(accountRetrieved);
            
            if (!accountRetrieved) {
                accountRetrieved = await fetchData(navigate, setUserType, setId);
            }
        })();
    }, []);

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
        if (userType === 'customer') {
            setActionChoice(prevChoice => prevChoice === 'search' ? 'bookings' : 'search');
        } else if (userType === 'lawyer') {
            setActionChoice(prevChoice => prevChoice === 'search' ? 'missions' : 'search');
        }
    }

    const styles = {
        navbar: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: '#006400',
            position: 'relative',
        },
        navbarText: {
            color: 'white',
            marginBottom: '20px',
        },
        navbarLinks: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            color: 'white',
        },
        managementOptions: {
            position: 'absolute',
            top: '50px',
            right: '10px',
            backgroundColor: 'black',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            textAlign: 'left',
            zIndex: 1,
        },
        link: {
            display: 'block',
            padding: '10px',
            color: 'white',
            transition: 'background-color 0.2s',
            textDecoration: 'none',
        },
        button: {
            padding: '10px',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
        },
        closeButton: {
        position: 'absolute',
        right: '-10px',
        '@media (max-width: 600px)': {
            top: '0px',
        },
    },
    };

    return (
<div>
   {isNavbarVisible && ( 
        <div className="fixed right-0 top-0 h-full w-full flex flex-col justify-between items-center p-4 bg-black bg-opacity-20 shadow-lg z-50 transition-all duration-500 ease-in-out">
           <div className="text-white mb-8 flex flex-col justify-center items-center">
               <div className="mb-4">
                   {userType === 'customer' && <Link to="/my-account" className="text-white">Customer account</Link>}
                   {userType === 'lawyer' && <Link to="/my-account" className="text-white">Lawyer account</Link>}
               </div>
               <button className="fas fa-cog px-4 py-2 text-white" onClick={() => setShowManagementOptions(!showManagementOptions)}>Manage Account</button>
               <button className="fas fa-sign-out-alt px-4 py-2 text-white" onClick={logoutAccount}>Logout</button>
           </div>
           {showManagementOptions && (
              <div className="w-full bg-gray-800 bg-opacity-50 rounded shadow-lg text-left z-10 p-4 transition-all duration-500 ease-in-out" style={{width: 'calc(100% - 32px)'}}>     <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" onClick={getAccount}>Get Account</Link>
                   <button className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" onClick={insertInfo}>Insert My Info</button>
                   <button className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" onClick={getInfo}>Get My Info</button>
                   <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" to="/delete-account">Delete Account</Link>
                   <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" to="/reset-password">Reset Password</Link>
                   <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" to="/change-password">Change Password</Link>
               </div>
           )}
           <div className="w-full bg-gray-800 rounded shadow-lg text-left z-10 p-4 transition-all duration-500 ease-in-out" style={{position: 'relative', top: '10px', width: 'calc(100% - 32px)'}}>
               <div className="flex items-center mb-4">
                   <span className="text-white mr-2">What do you want to do?</span>
               </div>
               <div className="flex justify-center">
               <button className="px-4 py-2 bg-gray-800 text-white rounded-lg transition-colors duration-200 hover:bg-gray-700 mr-2" onClick={handleActionChoice}>Switch</button>
               <div>
                   {actionChoice === 'search' && 
                       <Link 
                           className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" 
                           to="/advanced-search"
                           onClick={() => setIsNavbarVisible(false)}
                       >
                           Search For Lawyers
                       </Link>
                   }
                   {actionChoice === 'bookings' && userType === 'customer' && 
                       <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" to="/see-bookings">See my bookings</Link>
                   }
                   {actionChoice === 'missions' && userType === 'lawyer' && 
                       <Link className="block px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700" to="/see-missions">See my missions</Link>
                   }
                   {actionChoice === '' && 
                       <span className="block px-4 py-2 text-white">No option selected yet.</span>
                   }
               </div>
               </div>
           </div>
       </div>
    )}
</div>

    );
}

export default Navbar;
