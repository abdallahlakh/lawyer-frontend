import React, { useEffect, useRef } from 'react';
import SearchSection from './SearchSection';
import Images from './Images';
import FilterSection from './FilterSection';
import Navbar from './Navbar';

const AdvancedSearch = () => {
    // Create a ref for the filter section
    const filterSectionRef = useRef(null);

    // Scroll to filter section when component is loaded
    useEffect(() => {
        filterSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <div>
            <Navbar/>
            <SearchSection/>
            <Images />
            <div ref={filterSectionRef}>
                <FilterSection />
            </div>
        </div>
    );
};

export default AdvancedSearch;