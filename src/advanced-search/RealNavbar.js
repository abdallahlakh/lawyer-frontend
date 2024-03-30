import React from 'react';
import { Link } from 'react-router-dom';

const RealNavbar = () => {
    const styles = {
        navbar: {
            backgroundColor: '#4A5568', // Gray background color
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
    };

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
