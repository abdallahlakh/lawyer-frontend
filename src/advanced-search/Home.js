import React from 'react';
import HeaderSection from './HeaderSection';
import Images from './Images';
import Navbar from './Navbar'; 
import AboutUs from './AboutUs';
const Home = () => {
    return (
        <div>
            <Navbar/>
            <HeaderSection />
            <Images />
            <AboutUs />
            
        </div>
    );
};

export default Home;
