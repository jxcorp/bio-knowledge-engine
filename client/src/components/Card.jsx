// src/components/PaperCard.js (Clean, Minimalist Design)

import React, { useState } from "react";
import { Link } from "react-router-dom";

// Define the maximum number of characters to display before truncation
const MAX_TITLE_LENGTH = 80; // Using 100 characters for a good balance

const PaperCard = ({ paper }) => {
  // Declare hooks at the top
  const [isExpanded, setIsExpanded] = useState(false);

  // Fallback logic for authors and publication date
  const authorList = paper.publication_authors || paper.authors || []; 
  const publicationDate = paper.publicationDate || "";

  // Logic to show max 2 authors and add 'et al.'
  const authorsSnippet =
    authorList.length > 0
      ? authorList.slice(0, 2).join(", ") + 
        (authorList.length > 2 ? " et al." : "") 
      : "Authors N/A";
      
  // Determine if the title is long enough to require truncation
  // Note: We use a custom limit (100) now, not the one previously defined (50)
  const needsTruncation = paper.title.length > MAX_TITLE_LENGTH;

  // --- JS TRUNCATION LOGIC ---
  const displayTitle = 
    needsTruncation && !isExpanded
      ? paper.title.substring(0, MAX_TITLE_LENGTH) + '...' 
      : paper.title; 
  // ---------------------------


  return (
    // Minimalist Container: Clean white background, subtle border, gentle hover lift
    <div className="bg-white p-5 border border-gray-200 rounded-lg transition duration-200 hover:shadow-md group">
      
      {/* Title Block - Uses JS truncated title, NO line-clamp classes */}
      <h3
        className="text-xl font-bold text-blue-700 group-hover:text-blue-600 transition duration-150 mb-1"
      >
        {displayTitle}
      </h3>
      
      {/* Toggle Button for Read More/Less */}
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-blue-500 hover:text-blue-700 mt-1 mb-2 focus:outline-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}


      {/* Metadata Bar (Simple text hierarchy) */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
        {/* Authors */}
        <p className="font-medium truncate max-w-xs">
          <span className="text-gray-500 mr-1">By:</span>
          {authorsSnippet}
        </p>

        {/* Date - Only render if publicationDate exists to avoid orphaned separator */}
        {publicationDate && (
            <p className="text-gray-500">
                <span className="mx-1">•</span> 
                {publicationDate}
            </p>
        )}
      </div>

      {/* Tags (Minimalist Badges) */}
      <div className="flex flex-wrap gap-2 mb-3">
        {/* Source Type Tag */}
        <span
          className={`
                    text-xs font-semibold px-2 py-0.5 rounded-full 
                    ${
                      paper.sourceType === "Journal"
                        ? "bg-indigo-50 text-indigo-700"
                        : paper.sourceType === "OSDR"
                        ? "bg-orange-50 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }
                `}
        >
          {paper.sourceType}
        </span>

        {/* Category Tag */}
        {paper.subjectCategories && paper.subjectCategories.length > 0 && (
          <span className="text-xs font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
            {paper.subjectCategories[0]}
          </span>
        )}
      </div>

      {/* View Document Link (Simple text link) */}
      <div className="mt-2 text-left">
        {paper.sourceType === "OSDR" ? (
          <Link
            to={`/osdr/${paper.id}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition duration-150 underline-offset-2 hover:underline"
          >
            View Dataset
          </Link>
        ) : (
          <a
            href={paper.documentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition duration-150 underline-offset-2 hover:underline"
          >
            View Document{" "}
          </a>
        )}
      </div>
    </div>
  );
};

export default PaperCard;