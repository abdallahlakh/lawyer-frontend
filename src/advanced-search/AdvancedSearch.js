import React from 'react';
import SearchSection from './SearchSection';
import Images from './Images';
import FilterSection from './FilterSection';
import Navbar from './Navbar';

const AdvancedSearch = () => {
    return (
        <div>
            <Navbar/>
            <SearchSection/>
            <Images />
            <FilterSection />
            
        </div>
    );
};

export default AdvancedSearch;
