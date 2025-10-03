// src/components/ResultsList.js (Refactored for Load More only)

import React from "react";
import PaperCard from "./Card";

const ResultsList = ({
  results,
  isLoading,
  totalResults,
  searchTerm,

  showLoadMore, // True if results.length < totalResults
  onLoadMore, // The handler to increment the display count

  // REMOVED: isOSDRMode (Now Load More is used for ALL sources)
}) => {
  const renderControls = () => {
    if (totalResults === 0 || isLoading) return null;

    if (showLoadMore) {
      // Calculate remaining items to show in the button text
      const remaining = totalResults - results.length;

      return (
        <div className="flex justify-center mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onLoadMore}
            className="
        px-6 py-2 rounded-md text-base font-semibold 
        transition-colors duration-150 
        bg-white text-gray-700 
        border border-gray-300 
        hover:bg-gray-50 
        shadow-sm
    "
          >
            Load More Results ({remaining.toLocaleString()} remaining)
          </button>
        </div>
      );
    }

    // 2. DISPLAY 'ALL RESULTS' MESSAGE
    // If not showing load more, it means all results are displayed
    if (totalResults > 0) {
      return (
        <p className="text-center mt-6 pt-4 border-t border-gray-200 text-gray-500 text-sm">
          All {totalResults.toLocaleString()} results displayed.
        </p>
      );
    }

    return null;
  };

  // --- MAIN RENDER LOGIC ---
  if (isLoading) {
    return (
      <div className="text-center p-8 text-gray-500">
        <div className="animate-spin inline-block w-6 h-6 border-3 border-t-3 border-blue-500 border-gray-200 rounded-full mb-2"></div>
        <p className="text-sm">Loading results...</p>
      </div>
    );
  }

  const resultHeader = searchTerm
    ? `Results for "${searchTerm}"`
    : `All Documents`;

  return (
    <div>
      {/* STATS AND SORT BAR */}
      <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700">
          {resultHeader}{" "}
          <span className="text-gray-500 font-normal">
            ({totalResults.toLocaleString()} found)
          </span>
        </h2>
        <select className="p-1.5 border border-gray-300 rounded text-sm text-gray-600">
          <option>Sort by: Relevance</option>
          <option>Sort by: Date (Newest)</option>
          <option>Sort by: Date (Oldest)</option>
        </select>
      </div>

      {/* LIST OF CARDS */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((paper) => (
            // 2. Corrected the dynamic link syntax using {} and ``
            
              <PaperCard paper={paper} />
            
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-lg font-medium text-gray-500">No results found.</p>
          <p className="text-sm text-gray-400 mt-1">
            Please modify your filters or search term.
          </p>
        </div>
      )}

      {/* LOAD MORE CONTROLS */}
      {renderControls()}
    </div>
  );
};

export default ResultsList;
