// src/components/ResultsList.js (Stripped of all Pagination/Load More Logic)

import React from 'react';
import PaperCard from './Card';

const ResultsList = ({ 
    results, 
    isLoading, 
    totalResults, 
    searchTerm,
    // ALL PAGINATION AND LOAD MORE PROPS REMOVED:
    // currentPage,  
    // totalPages,   
    // onPageChange,
    // isOSDRMode,
    // showLoadMore,
    // onLoadMore
}) => {
    
    // --- MAIN RENDER ---
    if (isLoading) {
        return (
            <div className="text-center p-8 text-gray-600">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-500 border-gray-200 rounded-full mb-3"></div>
                <p>Loading data from Journals and NASA OSDR...</p>
            </div>
        );
    }

    const resultHeader = searchTerm 
        ? `Found ${totalResults.toLocaleString()} results for "${searchTerm}"`
        : `Showing recent ${totalResults.toLocaleString()} Space Biology Papers`;

    return (
        <div>
            {/* STATS AND SORT BAR */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h2 className="text-lg font-semibold text-gray-700">{resultHeader}</h2>
                <select className="p-2 border rounded-md text-sm">
                    <option>Sort by: Relevance</option>
                    <option>Sort by: Date (Newest)</option>
                    <option>Sort by: Date (Oldest)</option>
                </select>
            </div>
            
            {/* LIST OF CARDS */}
            {results.length > 0 ? (
                // Now displays ALL filtered results at once
                <div className="space-y-4">
                    {results.map(paper => (
                        <PaperCard key={paper.id} paper={paper} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-20 bg-white rounded-lg shadow-md">
                    <p className="text-xl font-medium text-gray-500">No results found.</p>
                    <p className="text-gray-400">Try adjusting your filters or search terms.</p>
                </div>
            )}
            
            {/* PAGINATION / LOAD MORE CONTROLS (REMOVED) */}
        </div>
    );
};

export default ResultsList;