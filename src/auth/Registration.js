import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

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


    const handleSubmit = async (event) => {
        event.preventDefault();

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
            // Handle error response from server
        }
    };

    const styles = {
        container: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
        },
        formGroup: {
            marginBottom: '15px',
        },
        formControl: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '3px',
        },
        btn: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
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
            color: '#007bff',
        },
    };

    return (
        <div style={styles.container}>
        <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
                <label>Email</label>
                <input style={styles.formControl} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={styles.formGroup}>
                <label>Username</label>
                <input style={styles.formControl} type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div style={styles.formGroup}>
                <label>Password</label>
                <input style={styles.formControl} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div style={styles.formGroup}>
                <label>Confirm Password</label>
                <input style={styles.formControl} type="password" value={rePassword} onChange={e => setRePassword(e.target.value)} required />
            </div>
            <div style={styles.formGroup}>
               <input type="radio" name="userType" value="admin" checked={isAdmin} onChange={e => {setIsAdmin(e.target.checked); setIsLawyer(false); setIsCustomer(false);}} />
               <label>Admin</label>
            </div>
            <div style={styles.formGroup}>
                <input type="radio" name="userType" value="lawyer" checked={isLawyer} onChange={e => {setIsLawyer(e.target.checked); setIsAdmin(false); setIsCustomer(false);}} />
                <label>Lawyer</label>
            </div>
            <div style={styles.formGroup}>
                <input type="radio" name="userType" value="customer" checked={isCustomer} onChange={e => {setIsCustomer(e.target.checked); setIsAdmin(false); setIsLawyer(false);}} />
                <label>Customer</label>
            </div>
            {error && <div style={styles.alert}>{error}</div>}
            <button style={styles.btn} type="submit">Register</button>
            <Link style={styles.link} to="/login">Login Here</Link>
            {message && <p className="text-green-500">{message}</p>} {/* Display the success message if it exists */}
           
        </form>
    </div>
    );
};

export default RegistrationForm;
