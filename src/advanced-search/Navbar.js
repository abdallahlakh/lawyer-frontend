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
        navbarLinks: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '2px',
            color: 'white',
            padding: '10px 0',
        },
        link: {
            display: 'block',
            padding: '2px',
            color: 'white',
            transition: 'background-color 0.2s',
            textDecoration: 'none',
            margin: '0 10px',
        },
        button: {
            backgroundColor: '#008000',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '0 10px',
        },
        managementOptions: {
            position: 'absolute',
            top: '12px',
            right: '5px',
            backgroundColor: 'black',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            textAlign: 'left',
        },
    };

    return (
        <div style={styles.navbar}>
            <div style={styles.navbarLinks}>
                {userType === 'lawyer' && <Link style={styles.link} to="/my-account">Lawyer account</Link>}
                {userType === 'customer' && <Link style={styles.link} to="/my-account">Customer account</Link>}
                {userType === 'lawyer' && <Link style={styles.link} to="/see-missions">See my missions</Link>}
                {userType === 'customer' && <Link style={styles.link} to="/see-bookings">See my bookings</Link>}
                <button style={styles.button} onClick={insertInfo}>Insert My Info</button>  
                <button style={styles.button} onClick={getInfo}>Get My Info</button>
                <Link style={styles.link} to="/advanced-search">Search For Lawyers</Link>
                <button style={styles.button} onClick={logoutAccount}>Logout</button>
                <button style={styles.button} onClick={handleManagementOptionsClick}>Manage Account</button>
            </div>
            {showManagementOptions && (
                <div style={styles.managementOptions}>
                    <Link style={styles.link} onClick={getAccount}>Get Account</Link>
                    <Link style={styles.link} to="/delete-account">Delete Account</Link>
                    <Link style={styles.link} to="/reset-password">Reset Password</Link>
                    <Link style={styles.link} to="/change-password">Change Password</Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;