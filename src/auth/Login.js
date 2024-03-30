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
        // Styles omitted for brevity, you can reuse the same styles from your original component
        // Ensure to include styles for spinner and disabled button
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
                {message && <p className="text-green-500">{message}</p>} {/* Display the success message if it exists */}
            </form>
        </div>
    );
};

export default LoginForm;
