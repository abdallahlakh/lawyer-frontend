import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import fetchData from './Security/FetchData';
const InfoFormLawyer = () => {
    const [selectedSpecialities, setSelectedSpecialities] = useState([]);
    const [selectedWilaya, setSelectedWilaya] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState(''); // New state variable for the success message
    const [messagee, setMessagee] = useState(''); // New state variable for the success message

    const [ID] = useState(10);
    const [showManagementOptions, setShowManagementOptions] = useState(false);
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(10);
    useEffect(() => {
        (async () => {
            let accountRetrieved = await fetchData(navigate, setUserType, setId);
            console.log(accountRetrieved);
           
            if(accountRetrieved) {
                return;
            }
            if(!accountRetrieved) {
                accountRetrieved = await fetchData(navigate, setUserType, setId);
                return;
            }
        })();
    }, []);
     // When selectedSpecialities changes, update lawyerData
    useEffect(() => {
        setLawyerData(prevState => ({ ...prevState, specialities: selectedSpecialities }));
    }, [selectedSpecialities]);
    
    // When selectedWilaya changes, update lawyerData
    useEffect(() => {
        setLawyerData(prevState => ({ ...prevState, location: selectedWilaya }));
    }, [selectedWilaya]);
    
    // When selectedLanguage changes, update lawyerData
    useEffect(() => {
        setLawyerData(prevState => ({ ...prevState, language: selectedLanguage }));
    }, [selectedLanguage]);
    const [lawyerData, setLawyerData] = useState({
        id: ID,
        name: '',
        email: '',
        phone: '',
        photo: '',
        location: selectedWilaya,
        lng: 0,
        lat: 0,
        specialities: selectedSpecialities,
        rating: 0.0,
        language: selectedLanguage,
    });

    const handleSpecialityChange = (event) => {
        const target = event.target;
        const value = target.value;
        if (target.checked) {
            setSelectedSpecialities([...selectedSpecialities, value]);
        } else {
            setSelectedSpecialities(selectedSpecialities.filter(speciality => speciality !== value));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedSpecialities.length === 0) {
            setMessagee('Please select at least one speciality');
            return;
        }
        if (selectedWilaya === '') {
            setMessagee('Please select a province');
            return;
        }
        if (selectedLanguage === '') {
            setMessagee('Please select a language');
            return;
        }
        if  (lawyerData.name === '' || lawyerData.email === '' || lawyerData.phone === '') {
            setMessagee('Please fill in all fields');
            return;
        }
        let accountRetrieved = await fetchData(navigate, setUserType, setId);
        console.log(accountRetrieved);
     
        console.log('Account retrieved successfully',accountRetrieved);
        const response = await fetch('http://127.0.0.1:8000/api/auth/users/me/', {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('access-token'),
            },
        });
        if (response.ok) {
            console.log('Account retrieved successfully');
            const data = await response.json();

            setLawyerData(prevState => ({
                ...prevState,
                id: data.id
            }));

            const data2 = {
                lawyerData: {
                    ...lawyerData,
                    id: data.id
                }
            };
            axios.post('http://127.0.0.1:8000/adi/insert-lawyers/', data2, {
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

    const legalSpecialities = [
        "Droit administratif", "Droit Affaires", "Droit civil", "Droit commercial", "Droit de l'immobilier",
        "Droit de la consommation", "Droit de la propriété intellectuelle", "Droit de la santé", "Droit des contrats",
        "Droit des entreprises", "Droit des étrangers", "Droit des sociétés", "droit douanier", "Droit du travail",
        "Droit familial", "Droit foncier", "Droit maritime", "Droit pénal", "Droit routier", "Droit social",
        "Droits de l'homme"
    ];

    return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border border-gray-300 rounded-md bg-gradient-to-r from-green-200 to-green-100 shadow-lg">
    <input className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400 bg-white" type="text" value={lawyerData.name} onChange={e => setLawyerData({ ...lawyerData, name: e.target.value })} placeholder="Lawyer Name" />
    <input className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400 bg-white" type="text" value={lawyerData.email} onChange={e => setLawyerData({ ...lawyerData, email: e.target.value })} placeholder="Lawyer Email" />
    <input className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400 bg-white" type="text" value={lawyerData.phone} onChange={e => setLawyerData({ ...lawyerData, phone: e.target.value })} placeholder="Lawyer Phone" />
    <select
        className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400 mb-4 bg-white text-gray-700"
        value={selectedWilaya}
        onChange={(e) => setSelectedWilaya(e.target.value)}
    >
        <option value="">Select the province</option>
        {wilayas.map((wilaya, index) => (
            <option key={index} value={wilaya}>{wilaya}</option>
        ))}
    </select>
    <div className="mb-4">
        {legalSpecialities.map((speciality, index) => (
            <label key={index} className="inline-flex items-center cursor-pointer text-gray-700">
                <input
                    type="checkbox"
                    value={speciality}
                    onChange={handleSpecialityChange}
                    checked={selectedSpecialities.includes(speciality)}
                    className="form-checkbox h-5 w-5 text-green-500 rounded border border-gray-300 focus:ring focus:ring-green-400"
                />
                <span className="ml-2 text-sm">{speciality}</span>
            </label>
        ))}
    </div>
    <select
        className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400 mb-4 bg-white text-gray-700"
        onChange={(e) => setSelectedLanguage(e.target.value)}
        value={selectedLanguage}
    >
        <option value="">Select the language</option>
        <option value="french">French</option>
        <option value="arabic">Arabic</option>
        <option value="english">English</option>
    </select>
    <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400">Submit</button>
    <button onClick={() => navigate(-1)} className="w-full py-3 bg-red-600 hover:bg-red-400 text-white rounded-md mt-4 focus:outline-none focus:ring focus:ring-red-400">Back</button> 
    {messagee && <p className="text-red-500 text-center mt-2">{messagee}</p>}
    {message && <p className="text-green-500 text-center mt-2">{message}</p>}
</form>
 
    );
};

export default InfoFormLawyer;