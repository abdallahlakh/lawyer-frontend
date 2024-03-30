import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import BeatLoader from "react-spinners/BeatLoader";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        console.log(`Email: ${email}, Password: ${password}`);
    
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
                setMessage('Login successful!');
                navigate('/my-account');
            } else {
                setMessage('Login failed');
                console.error('JWT token creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#333',
        },
        form: {
            width: '400px',
            padding: '40px',
            background: '#555',
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        },
        title: {
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
        },
        label: {
            display: 'block',
            marginBottom: '10px',
            fontSize: '14px',
            color: '#fff',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            color: '#fff',
            background: '#777',
        },
        button: {
            width: '100%',
            padding: '12px',
            background: '#999',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
        },
        buttonHover: {
            background: '#bbb',
        },
        link: {
            display: 'block',
            marginTop: '20px',
            fontSize: '14px',
            color: '#fff',
            textDecoration: 'none',
            textAlign: 'center',
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

                <button style={styles.button} type="submit" disabled={!isFormValid || loading}>
                    {loading ? <BeatLoader color="#ffffff" size={10} /> : 'Submit'}
                </button>
                <Link style={styles.link} to="/Registration">Register</Link>
                {message && <p className="text-green-500">{message}</p>}
            </form>
        </div>
    );
};

export default LoginForm;