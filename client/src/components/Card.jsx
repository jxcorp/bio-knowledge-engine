// src/components/PaperCard.js

import React from 'react';

// NOTE: The data inconsistency suggests the engine component (SpaceBiologyEngine.js)
// uses 'publication_authors' while this card expects 'authors'.
// I will primarily use 'publication_authors' (the field from your engine logic) 
// and add fallbacks to handle missing or undefined data safely.

const PaperCard = ({ paper }) => {
    
    const year = paper.publicationDate ? new Date(paper.publicationDate).getFullYear() : 'N/A';
    
    // 1. Get the list of authors, prioritizing 'publication_authors' (from engine logic) 
    //    and falling back to 'authors' (if that's what the CSV originally used), or an empty array.
    const authorList = paper.publication_authors || paper.authors || []; 
    
    // 2. Safely create the authors snippet using the guaranteed array.
    //    We check if the array has any items before creating the snippet.
    const authorsSnippet = authorList.length > 0
        ? authorList.slice(0, 3).join(', ') + (authorList.length > 3 ? ' et al.' : '')
        : 'Authors N/A'; // Fallback text when no authors are present

    // NOTE: If you decide to rename ALL author fields in SpaceBiologyEngine.js to just 'authors',
    // the code becomes cleaner, but this solution is robust to the inconsistency.

    return (
        <div className="bg-white p-5 border-l-4 border-blue-600 shadow-md hover:shadow-lg transition duration-200 rounded-lg">
            <a href={paper.documentLink} target="_blank" rel="noopener noreferrer" className="block">
                <h3 className="text-xl font-bold text-blue-800 hover:text-blue-600 transition duration-150 mb-1">
                    {paper.title}
                </h3>
            </a>
            
            <p className="text-sm text-gray-600 italic mb-2">
                {authorsSnippet}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">{year}</span>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">{paper.sourceType}</span>
                
                {/* Ensure subjectCategories[0] is safe */}
                {paper.subjectCategories && paper.subjectCategories.length > 0 && (
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">{paper.subjectCategories[0]}</span>
                )}
            </div>
            
            <p className="text-gray-700 text-sm line-clamp-3">
                {paper.abstract}
            </p>
            
            <div className="mt-3 text-right">
                <a href={paper.documentLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Document →
                </a>
            </div>
        </div>
    );
};

export default PaperCard;