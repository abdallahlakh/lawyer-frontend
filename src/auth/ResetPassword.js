import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('https://djoserauthapi-1.onrender.com/api/auth/users/reset_password/', { email });
            console.log(response.data);
        } catch (error) {
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
            <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <button style={styles.button} type="submit">Reset Password</button>
            <button onClick={() => navigate(-1)} className="bg-gray-600 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded mt-4 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg self-center text-base">Back</button>

        </form>
    );
};

export default ResetPasswordForm;
