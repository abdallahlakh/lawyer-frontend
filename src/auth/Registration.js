import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { FaSpinner } from 'react-icons/fa'; // Import Spinner icon from react-icons/fa

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLawyer, setIsLawyer] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);
    const [message, setMessage] = useState(''); // New state variable for the success message
    const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission status

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== rePassword) {
            setError("Passwords do not match");
            return;
        }

        setIsSubmitting(true); // Set submitting to true on form submission

        const data = {
            email: email,
            name: name,
            password: password,
            re_password: rePassword,
            is_admin: isAdmin,
            is_lawyer: isLawyer,
            is_customer: isCustomer,
        };

        try {
            const response = await axios.post('https://djoserauthapi-1.onrender.com/api/auth/users/', data);
            console.log(response);
            if (response.status === 201) {
                console.log('Account created successfully');
                setMessage('we send you an email to confirm your account');
            } else {
                setMessage('Failed to send email');
            }
            console.log(response.data);
        } catch (error) {
            setMessage('Failed to create account');
            console.error(error);
        } finally {
            setIsSubmitting(false); // Reset submitting to false after request completes
        }
    };

    const styles = {
        // Existing styles remain unchanged
        
        checkboxLabel: {
            display: 'block',
            marginBottom: '10px',
            fontSize: '14px',
            color: '#333',
        },
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Register</h2>
                <label style={styles.label}>
                    Email:
                    <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label style={styles.label}>
                    Username:
                    <input style={styles.input} type="text" value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <label style={styles.label}>
                    Password:
                    <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <label style={styles.label}>
                    Confirm Password:
                    <input style={styles.input} type="password" value={rePassword} onChange={e => setRePassword(e.target.value)} required />
                </label>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                    Admin
                </label>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" checked={isLawyer} onChange={() => setIsLawyer(!isLawyer)} />
                    Lawyer
                </label>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" checked={isCustomer} onChange={() => setIsCustomer(!isCustomer)} />
                    Customer
                </label>
                <button style={styles.button} type="submit" disabled={isSubmitting}>
                    {isSubmitting && <FaSpinner style={styles.spinner} className="animate-spin" />} {/* Show spinner icon if submitting */}
                    Register
                </button>
                <Link style={styles.link} to="/login">Login Here</Link>
                {message === 'Failed to create account' && <p style={styles.errorMessage}>{message}</p>}
            </form>
        </div>
    );
};

export default RegistrationForm;
