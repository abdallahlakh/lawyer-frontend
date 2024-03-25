import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState(''); // New state variable for the success message

    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('access-token'); // Assuming the token is stored in localStorage

            const response = await axios.post(
                'http://127.0.0.1:8000/api/auth/users/set_password/', 
                {
                    new_password: newPassword,
                    re_new_password: reNewPassword,
                    current_password: currentPassword
                },
                {
                    headers: {
                        'Authorization': `JWT ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(response.status === 204){
                console.log('Password changed successfully');
                setMessage('Password changed successfully');
                navigate('/');
            }
        } catch (error) {
            setMessage('Failed to change password');
            console.error(error);
        }
    };

    const styles = {
        form: {
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        input: {
            width: '100%',
            padding: '8px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '3px',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
        },
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <input
                style={styles.input}
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
            />
            <input
                style={styles.input}
                type="password"
                value={reNewPassword}
                onChange={e => setReNewPassword(e.target.value)}
                placeholder="Re-enter New Password"
                required
            />
            <input
                style={styles.input}
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                required
            />
            <button style={styles.button} type="submit">Change Password</button>
            {message && <p className="text-green-500">{message}</p>} {/* Display the success message if it exists */}
            <button onClick={() => navigate(-1)} className="bg-gray-600 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg self-center text-base">Back</button>

        </form>
    );
};

export default ChangePasswordForm;
