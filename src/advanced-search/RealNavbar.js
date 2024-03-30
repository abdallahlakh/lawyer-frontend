import React from 'react';
import { Link } from 'react-router-dom';

const RealNavbar = () => {
  
    return (
        <div style={styles.navbar}>
            <div style={styles.navbarItems}>
                <Link to="/registration" style={styles.link}>Register</Link>
                <Link to="/login" style={styles.link}>Login</Link>
            </div>
        
        </div>
    );
}
export default RealNavbar;

const styles = {
    navbar: {
        backgroundColor: '#006400', // Dark green background color
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '50px',
        padding: '0 20px',
    },
    navbarItems: {
        marginRight: 'auto', // Pushes items to the left
    },
    link: {
        textDecoration: 'none',
        color: '#fff', // White text color
        marginRight: '10px',
        cursor: 'pointer',
    },
    logoutButton: {
        backgroundColor: 'hsl(207, 100%, 50%)', // Green color for the logout button
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '20px',
    },
    manageAccountButton: {
        backgroundColor: 'hsl(207, 100%, 50%)', // Green color for the manage account button
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '20px',
    },
    managementOptions: {
        position: 'absolute',
        top: '50px',
        right: '20px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: '999',
        textAlign: 'left',
    },
    managementLink: {
        display: 'block',
        padding: '10px 20px',
        textDecoration: 'none',
        color: '#333',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};
