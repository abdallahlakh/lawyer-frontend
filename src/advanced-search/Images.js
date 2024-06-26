import React, { useState, useEffect } from 'react';
import lawyerImage1 from './images/mikhail-pavstyuk-EKy2OTRPXdw-unsplash.jpg';
import lawyerImage2 from './images/Screenshot from 2024-03-24 21-55-47.jpg';
import lawyerImage3 from './images/Screenshot from 2024-03-30 22-25-30.png';
import lawyerImage4 from './images/smiling-woman-posing-with-notebook-white-background-high-quality-photo.jpg';

const Images = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [lawyerImage1, lawyerImage2, lawyerImage3, lawyerImage4];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div style={{width: '100vw', height: '100vh'}} className="flex flex-col items-center">
            <div className="relative w-screen h-screen overflow-hidden mb-4">
                <img
                    src={images[currentImageIndex]}
                    alt="Lawyer"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-50 object-center" // Remove opacity-50 class
                />
            </div>
        </div>
    );
};

export default Images;