// Example: src/components/Searchresults.js (ResultsList component)

import React from 'react';

// Accept the new pagination props
const ResultsList = ({ 
    results, 
    isLoading, 
    totalResults, 
    searchTerm,
    currentPage,  // <-- Pagination Prop
    totalPages,   // <-- Pagination Prop
    onPageChange  // <-- Pagination Prop
}) => {
    
    // Function to render the pagination buttons
    const renderPagination = () => {
        if (totalPages <= 1) return null; // Hide if only one page

        // Simple button array generation (e.g., show max 5 pages around current)
        const pages = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        // Add 'Prev' button
        pages.push(
            <button
                key="prev"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
            >
                Previous
            </button>
        );

        // Add page number buttons
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 mx-1 border rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                    {i}
                </button>
            );
        }

        // Add 'Next' button
        pages.push(
            <button
                key="next"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        );

        return (
            <div className="flex justify-center mt-6">
                {pages}
            </div>
        );
    };

    // --- RENDER LOGIC ---
    if (isLoading) {
        return <div className="text-center py-10">Loading results...</div>;
    }
    
    // ... other empty state logic ...

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                Results ({totalResults} found)
            </h2>
            
            {/* List of Results */}
            <div className="space-y-4">
                {results.map((item) => (
                    // 🚨 Add key property!
                    <div key={item.id} className="p-4 border rounded shadow-sm hover:bg-gray-50">
                        <a 
                            href={item.documentLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-blue-600 hover:underline"
                        >
                            {item.title}
                        </a>
                        <p className="text-sm text-gray-500 mt-1">
                            Source: {item.sourceType}
                        </p>
                    </div>
                ))}
            </div>

            {/* 🚀 Insert the Pagination Buttons here */}
            {renderPagination()}

        </div>
    );
};

export default ResultsList;