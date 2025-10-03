// src/components/FilterSidebar.js

import React, { useState } from 'react';

// Define the available categories and source types
const SOURCES = [
    // Added 'all' source option for completeness in the filter list
    { value: 'all', label: 'All Sources' }, 
    { value: 'sti', label: 'NASA STI (Reports)' },
    { value: 'osdr', label: 'OSDR (Raw Data)' },
    { value: 'journal', label: 'Journal Articles' }
];

const FilterSidebar = ({ filters, onFilterChange, onSearchSubmit }) => {
    // Local state for the search input field
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    const handleSearchChange = (e) => {
       /*  setLocalSearchTerm(e.target.value); */
    };

    // Handle form submission (when the user hits Enter or clicks the search icon)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Propagate the search term up to the parent component (SpaceBiologyEngine)
       /*  onSearchSubmit(localSearchTerm.trim()); */
    };

    const handleSourceChange = (e) => {
        
       /*  onFilterChange({ source: e.target.value }); */
    };

    return (
        <div className="space-y-6">
            
            {/* 1. Text Search Input */}
            <form onSubmit={handleSearchSubmit} className="pb-4 border-b border-gray-200">
                <label htmlFor="search-input" className="block text-sm font-semibold text-gray-700 mb-2">
                    Search Documents
                </label>
                <div className="flex">
                    <input
                        id="search-input"
                        type="search"
                        value={localSearchTerm}
                        onChange={handleSearchChange}
                        placeholder="e.g., Radiation shielding, life support"
                        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                    <button
                        type="submit"
                        className="px-3 bg-blue-700 text-white rounded-r-md hover:bg-blue-800 transition duration-150"
                        title="Search"
                    >
                        {/* Search Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </form>

            {/* 2. Document Source Filter (Radio Buttons) */}
            <div className="pb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-3 uppercase tracking-wider">Source Type</h3>
                <div className="space-y-2">
                    {SOURCES.map(source => (
                        <div key={source.value} className="flex items-center">
                            <input
                                id={`source-${source.value}`}
                                name="source"
                                type="radio"
                                value={source.value}
                                // The filters prop dictates the current state
                                checked={filters.source === source.value}
                                onChange={handleSourceChange}
                                className="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={`source-${source.value}`} className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                {source.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Subject Categories (Removed) */}
            {/* Publication Year Range Filter (Removed) */}
            
        </div>
    );
};

export default FilterSidebar;