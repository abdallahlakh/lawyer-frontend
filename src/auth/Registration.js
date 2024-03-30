import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLawyer, setIsLawyer] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (email && name && password && rePassword && password === rePassword) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [email, name, password, rePassword]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (password !== rePassword) {
            setError("Passwords do not match");
            return;
        }
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
            if(response.status === 201){
                console.log('Account created successfully');
                setMessage('we send you an email to confirm your account');
            }
            else {
                setMessage('Failed to send email');
            }

            console.log(response.data);
        } catch (error) {
            setMessage('Failed to create account');
            console.error(error);
        }

        setLoading(false);
    };

    const styles = {
        container: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            background: '#333',
        },
        formGroup: {
            marginBottom: '15px',
            color: '#fff',
        },
        formControl: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            background: '#555',
            color: '#fff',
        },
        btn: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#999',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
        },
        alert: {
            color: 'red',
            marginBottom: '10px',
        },
        link: {
            display: 'block',
            marginTop: '10px',
            textDecoration: 'none',
            color: '#fff',
        },
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label>Email</label>
                    <input style={styles.formControl} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div style={styles.formGroup}>
                    <label>Name</label>
                    <input style={styles.formControl} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div style={styles.formGroup}>
                    <label>Password</label>
                    <input style={styles.formControl} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div style={styles.formGroup}>
                    <label>Confirm Password</label>
                    <input style={styles.formControl} type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required />
                </div>
                <button style={styles.btn} type="submit" disabled={!isFormValid || loading}>
                    {loading ? <BeatLoader color="#ffffff" size={10} /> : 'Register'}
                </button>
                <Link style={styles.link} to="/login">Login Here</Link>
                {message && <p style={{color: 'green'}}>{message}</p>}
            </form>
        </div>
    );
};

export default RegistrationForm;