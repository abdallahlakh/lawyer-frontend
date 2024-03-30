import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Import Spinner icon from react-icons/fa

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState(''); // New state variable for the success message
    const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission status

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);

        setIsSubmitting(true); // Set submitting to true on form submission

        try {
            const response = await fetch('https://djoserauthapi-1.onrender.com/api/auth/jwt/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem('access-token', data.access);
                localStorage.setItem('refresh-token', data.refresh);
                setMessage('Login successful!'); // Set the success message
                navigate('/my-account');
            } else {
                setMessage('Login failed');
                console.error('JWT token creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false); // Reset submitting to false after request completes
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f2f2f2',
        },
        form: {
            width: '300px',
            padding: '20px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        },
        title: {
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
        },
        label: {
            display: 'block',
            marginBottom: '10px',
            fontSize: '14px',
            color: '#333',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
        },
        button: {
            width: '100%',
            padding: '12px',
            background: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            position: 'relative', // Set position relative for loading spinner
        },
        spinner: {
            position: 'absolute',
            top: '50%',
            right: '15px',
            transform: 'translateY(-50%)',
            color: '#fff', // Change color to white
        },
        link: {
            display: 'block',
            marginTop: '20px',
            fontSize: '14px',
            color: '#333',
            textDecoration: 'none',
            textAlign: 'center',
        },
        message: {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '14px',
            color: 'green',
        },
        errorMessage: {
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '14px',
            color: 'red', // Change color to red for error message
        },
    };
    
    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Login</h2>
                <label style={styles.label}>
                    Email:
                    <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label style={styles.label}>
                    Password:
                    <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>

                <button style={styles.button} type="submit" disabled={isSubmitting}>
                    {isSubmitting && <FaSpinner style={styles.spinner} className="animate-spin" />} {/* Show spinner icon if submitting */}
                    Submit
                </button>
                <Link style={styles.link} to="/Registration">Register</Link>
                {message === 'Login failed' && <p style={styles.errorMessage}>{message}</p>}

            </form>
        </div>
    );
};

export default LoginForm;
