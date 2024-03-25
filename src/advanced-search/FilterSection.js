import React, { useState,useEffect } from 'react';
import SearchResult from './SearchResult';
import fetchData from './Security/FetchData';
import { useNavigate } from 'react-router-dom';
const FilterSection = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(10);
   
    const [searchResults, setSearchResults] = useState([]);
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

    const [selectedSpecialities, setSelectedSpecialities] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedWilaya, setSelectedWilaya] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleSpecialityChange = (event) => {
        const target = event.target;
        const value = target.value;
        if (target.checked) {
            setSelectedSpecialities([...selectedSpecialities, value]);
        } else {
            setSelectedSpecialities(selectedSpecialities.filter(speciality => speciality !== value));
        }
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            setSelectedSpecialities([...selectedSpecialities, inputValue.trim()]);
            setInputValue('');
        }
    };

 

    const handleSearch = async () => {
        let accountRetrieved = await fetchData(navigate, setUserType, setId);
        console.log(accountRetrieved);
        
        if (!selectedSpecialities.length && !selectedWilaya && !selectedLanguage && inputValue.trim() === '') {
             return; 
        }
        const formData = new FormData();
        formData.append('specialities', selectedSpecialities);
        formData.append('wilaya', selectedWilaya);
        formData.append('language', selectedLanguage);
        formData.append('lawyerName', inputValue);
    
        fetch('https://djoserauthapi-1.onrender.com/adi/search-lawyers', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('access-token'),
            },
        })
        .then(response => response.json() )
        .then(data => setSearchResults(data)) 
        .catch(error => console.error('Error:', error));
    };
    
    return (<div className="relative top-0 left-0 right-0 flex items-center justify-center z-8">
    <div className="flex items-center justify-center relative " >
        <div className="flex flex-col items-center justify-center border border-green-300 p-4 rounded-md relative z-10 bg-white bg-opacity-80 shadow-lg">
            <div className="mt-4 space-y-4">
                <label htmlFor="nameInput" className="sr-only">the name of lawyer</label>
                <input
                    id="nameInput"
                    type="text"
                    placeholder="the name of lawyer"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    className="w-full py-2 px-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
                />

                <select
                    className="w-full py-2 px-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    value={selectedWilaya}
                >
                    <option value="">select the province</option>
                    {wilayas.map((wilaya, index) => (
                        <option key={index} value={wilaya}>{wilaya}</option>
                    ))}
                </select>

                <div>
                    {legalSpecialities.map((speciality, index) => (
                        <label key={index} className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value={speciality}
                                onChange={handleSpecialityChange}
                                checked={selectedSpecialities.includes(speciality)}
                                className="form-checkbox h-5 w-5 text-green-500 rounded border border-green-300 focus:ring focus:ring-green-400"
                            />
                            <span className="ml-2 text-sm">{speciality}</span>
                        </label>
                    ))}
                </div>

                <select
                    className="w-full py-2 px-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    value={selectedLanguage}
                >
                    <option value="">select the language</option>
                    <option value="french">French</option>
                    <option value="arabic">Arabic</option>
                    <option value="english">English</option>
                </select>

                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-400"
                    onClick={handleSearch}>
                    Search
                </button>
                <SearchResult searchResults={searchResults} />
            </div>
        </div>
    </div>
</div>
    );
};

export default FilterSection;
