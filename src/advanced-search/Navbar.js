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
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '3px',
            backgroundColor: '#006400',
        },
        navbarText: {
            color: 'white',
            marginBottom: '20px',
        },
        navbarLinks: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            color: 'white',
            '@media (max-width: 600px)': {
                flexDirection: 'column',
            },
        },
        link: {
            display: 'block',
            padding: '10px 20px',
            color: 'white',
            transition: 'background-color 0.2s',
            textDecoration: 'none',
            backgroundColor: '#006400',
            borderRadius: '5px',
            textAlign: 'center',
        },
        button: {
            display: 'inline-block',
            padding: '10px 20px',
            color: 'white',
            backgroundColor: '#006400',
            border: 'none',
            borderRadius: '5px',
            textDecoration: 'none',
            textAlign: 'center',
            transition: 'background-color 0.2s',
            cursor: 'pointer',
            '@media (max-width: 600px)': {
                marginBottom: '10px',
            },
        },
        managementOptions: {
            position: 'absolute',
            top: '12px',
            right: '5px',
            backgroundColor: 'black',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            textAlign: 'left',
            '@media (max-width: 600px)': {
                position: 'static',
                boxShadow: 'none',
            },
        },
    };
    return (
        <div className="flex flex-col justify-between items-center p-3 bg-green-700">
        <div className="text-white mb-20">
            {userType === 'customer' && <Link to="/my-account" className="block p-2 text-white transition-colors bg-green-700 rounded-md text-center">Customer account</Link>}
            {userType === 'lawyer' && <Link to="/my-account" className="block p-2 text-white transition-colors bg-green-700 rounded-md text-center">Lawyer account</Link>}
            <button className="inline-block p-2 text-white transition-colors bg-green-700 rounded-md text-center cursor-pointer" onClick={handleManagementOptionsClick}>Manage Account</button>
        </div>
        <div className="flex flex-row items-center gap-10 text-white sm:flex-col">
            {userType === 'lawyer' && <Link to="/see-missions" className="block p-2 text-white transition-colors bg-green-700 rounded-md text-center">See my missions</Link>}
            {userType === 'customer' && <Link to="/see-bookings" className="block p-2 text-white transition-colors bg-green-700 rounded-md text-center">See my bookings</Link>}
            <button className="inline-block p-2 text-white transition-colors bg-green-700 rounded-md text-center cursor-pointer" onClick={insertInfo}>Insert My Info</button>  
            <button className="inline-block p-2 text-white transition-colors bg-green-700 rounded-md text-center cursor-pointer" onClick={getInfo}>Get My Info</button>
            <Link to="/advanced-search" className="block p-2 text-white transition-colors bg-green-700 rounded-md text-center">Search For Lawyers</Link>
            <button className="inline-block p-2 text-white transition-colors bg-green-700 rounded-md text-center cursor-pointer" onClick={logoutAccount}>Logout</button>
        </div>
        {showManagementOptions && (
            <div className="absolute top-12 right-5 bg-black rounded-md shadow-lg text-left sm:static sm:shadow-none">
                <Link onClick={getAccount} className="block p-2 text-white transition-colors bg-green-700 rounded-md text-center">Get Account</Link>
                <Link to="/delete-account" className="block p-2 text-white transition-colors bg-green-700 rounded-md text-center">Delete Account</Link>
                <Link to="/reset-password" className="block p-2 text-white transition-colors bg-green-700 rounded-md text-center">Reset Password</Link>
                <Link to="/change-password" className="block p-2 text-white transition-colors bg-green-700 rounded-md text-center">Change Password</Link>
            </div>
        )}
    </div>
    );
}

export default Navbar;