import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import fetchData from './Security/FetchData';

const InfoFormCustomer = () => {
    const [selectedWilaya, setSelectedWilaya] = useState('');
    const [ID] = useState(10);
    const [message, setMessage] = useState(''); // New state variable for the success message
    const [messagee, setMessagee] = useState(''); 
    // New state variable for the success message
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(10);
    const [customerData, setCustomerData] = useState({
        id: ID,
        name: '',
        email: '',
        phone: '',
        photo: '',
        location: selectedWilaya,
    });

    // When selectedWilaya changes, update lawyerData
    useEffect(() => {
        setCustomerData(prevState => ({ ...prevState, location: selectedWilaya }));
    }, [selectedWilaya]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (selectedWilaya === '') {
            setMessagee('Please select a province');
            return;
        }
        if (customerData.name === '') {
            setMessagee('Please enter a name');
            return;
        }
        if (customerData.email === '') {
            setMessagee('Please enter an email');
            return;
        }
        if (customerData.phone === '') {
            setMessagee('Please enter a phone number');
            return;
        }
        if (customerData.location === '') {
            setMessagee('Please enter a location');
            return;
        }
    
        let accountRetrieved = await fetchData(navigate, setUserType, setId);
        console.log(accountRetrieved);
        
            
                console.log('Account retrieved successfully',accountRetrieved);
            const response = await fetch('https://djoserauthapi-1.onrender.com/api/auth/users/me/', {
                method: 'GET',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                },
            });
    
            if (response.ok) {
                console.log('Account retrieved successfully');
                const data = await response.json();
    
                setCustomerData(prevState => ({
                    ...prevState,
                    id: data.id
                }));
    
                const data2 = {
                    customerData: {
                        ...customerData,
                        id: data.id
                    }
                };
    
                axios.post('https://djoserauthapi-1.onrender.com/adi/insert-customers/', data2, {
                    headers: {
                        'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                    },
                })
                .then(response2 => {
                    console.log(response2.data);
                    if (response2.status === 200) {
                        setMessage('Customer inserted successfully!');
                    } else {
                        setMessagee('Failed to insert customer');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            } else {
                console.error('Failed to retrieve account');
            }
        
    };



    const wilayas = [
        "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
        "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
        "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine",
        "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj",
        "Boumerdès", "El Taref", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", "Tipaza",
        "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane"
    ];


    return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border border-gray-300 rounded-md bg-gradient-to-r from-green-200 to-green-100 shadow-lg">
    <input className="w-full p-3 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-400 bg-white" type="text" value={customerData.name} onChange={e => setCustomerData({ ...customerData, name: e.target.value })} placeholder="Customer Name" />
    <input 
    className="w-full p-3 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-400 bg-white" 
    type="email" 
    value={customerData.email} 
    onChange={e => setCustomerData({ ...customerData, email: e.target.value })} 
    placeholder="Customer Email" 
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    title="Please enter a valid email address."
/>
<input 
    className="w-full p-3 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-400 bg-white" 
    type="tel" 
    value={customerData.phone} 
    onChange={e => setCustomerData({ ...customerData, phone: e.target.value })} 
    placeholder="Customer Phone" 
    pattern="\d{10}"
    title="Please enter a valid phone number with 10 digits."
/>  <select
        className="w-full py-3 px-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-400 mb-4 bg-white text-gray-700"
        value={selectedWilaya}
        onChange={(e) => setSelectedWilaya(e.target.value)}
    >
        <option value="">Select the province</option>
        {wilayas.map((wilaya, index) => (
            <option key={index} value={wilaya}>{wilaya}</option>
        ))}
    </select>
    <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400">Submit</button>
    <button onClick={() => navigate(-1)} className="w-full py-3 bg-red-600 hover:bg-red-800 text-white rounded-md mt-4 focus:outline-none focus:ring focus:ring-red-400">Back</button> 
    {messagee && <p className="text-red-500 text-center mt-2">{messagee}</p>}
    {message && <p className="text-green-500 text-center mt-2">{message}</p>}
</form>
    );
};

export default InfoFormCustomer;