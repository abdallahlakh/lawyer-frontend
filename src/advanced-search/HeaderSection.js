import React from 'react';

const headerStyles = {
    backgroundColor: 'transparent', // Transparent background
    color: '#fff', // White text color
    padding: '20px', // Padding around content
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Shadow for a modern look
};

const SearchSection = () => {
    return (
        <div className="header-section" style={headerStyles}>
            <div className="text-white py-8 text-center">
                <h1 className="text-4xl font-semibold mb-4">Mouhami DZ</h1>
                <h2 className="text-xl">Where You Make Booking, Review, and more ...</h2>
            </div>
        </div>
    );
};

export default SearchSection;
