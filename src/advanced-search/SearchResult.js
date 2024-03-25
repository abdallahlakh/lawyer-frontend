import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SearchResult = ({ searchResults }) => {
    // Check if searchResults is undefined or not an array
    if (!searchResults || !Array.isArray(searchResults)) {
        return <div>No search results found.</div>;
    }

    return (
        <div className="mt-8">
            <ul>
                {searchResults.map((result, index) => (
                    <li key={index} className="mb-4 p-4 border border-gray-300 rounded flex items-center">
                        <img src={result.photo} alt={result.name} className="w-16 h-16 rounded-full mr-4" />
                        <div>
                            <div className="mb-2">
                                <span className="font-bold">Name:</span> {result.name}
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">Location:</span> {result.location}
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">Specialities:</span> {result.specialities.join(', ')}
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">Language:</span> {result.languages.join(', ')}
                            </div>
                            <Link
                                to={{
                                    pathname: `/advanced-search/view-details/${result.id}`,
                                    state: { resultData: result }
                                }}
                                className="text-blue-500 hover:underline"
                            >
                                See Details
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResult;
