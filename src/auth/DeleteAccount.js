import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const DeleteAccountForm = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // New state variable for the success message
    const navigate = useNavigate();
    const deleteAccount = (event) => {
        event.preventDefault(); // Prevent the form from submitting by default

        axios.delete('http://127.0.0.1:8000/api/auth/users/me/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('access-token'),
            },
            data: { current_password: password }
        })
            .then(response => {
                console.log('Account deleted successfully');
                
                localStorage.removeItem('access-token');
                localStorage.removeItem('refresh-token');
                setMessage('Account deleted successfully'); // Set the success message
                // Perform any additional actions after account deletion
            })
            .catch(error => {
                console.error('Error:', error);
                setMessage('Failed to delete account');
            });
    };

    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '300px',
            margin: '0 auto',
        },
        input: {
            marginBottom: '10px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <form onSubmit={deleteAccount} style={styles.form}>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Delete Account</button>
            {message && <p className="text-green-500">{message}</p>} {/* Display the success message if it exists */}
            <button onClick={() => navigate(-1)} className="bg-gray-600 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg self-center text-base">Back</button>

        </form>
    );
};

export default DeleteAccountForm;
