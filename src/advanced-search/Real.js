import React from 'react';
import HeaderSection from './HeaderSection';
import Images from './Images';
import RealNavbar from './RealNavbar';
import AboutUs from './AboutUs';

const Real = () => {
    return (
        <div>
            <RealNavbar/>
            <div className="relative">
                <Images />
                <div className="absolute top-0 left-0 w-full h-full">
                    <HeaderSection />
                </div>
            </div>
            <AboutUs />
        </div>
    );
};

export default Real;