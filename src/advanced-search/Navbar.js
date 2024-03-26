import React, {useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetchData from './Security/FetchData';

const Navbar = () => {
    const navigate = useNavigate();
    const [showManagementOptions, setShowManagementOptions] = useState(false);
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(10);
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
     // Run only on moun
    const insertInfo = () => {
            if (userType === 'lawyer'){
                navigate('/insert-info-lawyer');
            }
            else if (userType === 'customer'){
                navigate('/insert-info-customer');
            }
        
    }
        
    const getInfo = () => {
        if (userType === 'lawyer'){
            navigate(`/lawyer-details/${id}`);
        }
        else if (userType === 'customer'){
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
                if (response.status === 401) {
                    // Unauthorized
                    let accountRetrieved = await fetchData(navigate, setUserType, setId);
                    console.log(accountRetrieved);
    
                    if (!accountRetrieved) {
                        accountRetrieved = await fetchData(navigate, setUserType, setId);
                    }
                    return;
                } else {
                    console.error('Failed to retrieve account');
                    return;
                }
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
    const styles = {
        navbar: {
            display: 'flex',
            flexDirection: window.innerWidth > 768 ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: window.innerWidth > 768 ? '5px' : '3px',
            backgroundColor: '#006400',
        },
        navbarLinks: {
            display: 'flex',
            flexDirection: window.innerWidth > 768 ? 'row' : 'column',
            alignItems: 'center',
            gap: window.innerWidth > 768 ? '0px' : '2px',
        },
    };
    

    // Define other functions like getUserData, updateUserData, and changePassword in a similar way

    return (
 
        <div className="flex flex-col md:flex-row justify-between items-center h-12 md:h-16 p-3 md:p-5 bg-blue" style={styles.navbar}>
        <div className="text-white mb-2 md:mb-0">
            {userType === 'customer' && <Link to="/my-account">Customer account</Link>}
            {userType === 'lawyer' && <Link to="/my-account">Lawyer account</Link>}
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2" style={styles.navbarLinks}>
            {userType === 'lawyer' && <Link to="/see-missions" className="text-white cursor-pointer">See my missions</Link>}
            {userType === 'customer' && <Link to="/see-bookings" className="text-white cursor-pointer">See my bookings</Link>}
            <button onClick={insertInfo} className="text-white cursor-pointer">Insert My Info</button>  
            <button onClick={getInfo} className='text-white cursor-pointer'>Get My Info</button>
            <Link to="/advanced-search" className="text-white cursor-pointer">Search For Lawyers</Link>
            <button onClick={logoutAccount} style={{backgroundColor: "#006400"}} className="text-white border-none rounded cursor-pointer bg-black">Logout</button>
            <button onClick={handleManagementOptionsClick} style={{backgroundColor: "#006400"}} className="text-white border-none rounded cursor-pointer bg-black">Manage Account</button>
        </div>
        {showManagementOptions && (
            <div className="absolute top-12 right-5 bg-black rounded shadow-md z-10 text-left">
                <Link onClick={getAccount} className="block p-2 text-white cursor-pointer transition-colors duration-200 hover:bg-gray-200">Get Account</Link>
                <Link to="/delete-account" className="block p-2 text-white cursor-pointer transition-colors duration-200 hover:bg-gray-200">Delete Account</Link>
                <Link to="/reset-password" className="block p-2 text-white cursor-pointer transition-colors duration-200 hover:bg-gray-200">Reset Password</Link>
                <Link to="/change-password" className="block p-2 text-white cursor-pointer transition-colors duration-200 hover:bg-gray-200">Change Password</Link>
            </div>
        )}
    </div>
     );
}

export default Navbar;













