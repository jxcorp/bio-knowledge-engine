// src/SpaceBiologyEngine.js (Integrated Engine with Pagination)

import React, { useState, useEffect } from "react";
import * as dsv from "d3-dsv";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import ResultsList from "../components/Searchresults";
import { fetchOSDRData } from "../components/osdrdata"; // Import OSDR fetcher

// 1. Import all static data sources
import journalDataCSV from "../data/journals.csv";

const RESULTS_PER_PAGE = 10; // Define pagination constant

const SpaceBiologyEngine = () => {
  // allData now holds the MERGED, UNFILTERED data (Journal + OSDR)
  const [allData, setAllData] = useState([]);
  
  // filteredData holds the data after text search and source/year filtering
  const [filteredData, setFilteredData] = useState([]); 
  
  // results holds the final PAGINATED slice of filteredData
  const [results, setResults] = useState([]); 
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 🚀 NEW: State for current page
  
  const [filters, setFilters] = useState({
    categories: [],
    yearStart: 2000, 
    yearEnd: new Date().getFullYear(),
    source: "all", 
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  // --- 1. Initial Load (Journal + OSDR Data) ---
  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      let journalData = [];
      let osdrData = [];

      // A. Load Journal Data
      try {
        const response = await fetch(journalDataCSV);
        const csvText = await response.text();
        journalData = dsv.csvParse(csvText, (d, i) => {
          return {
            id: `journal-${i}`,
            title: d.Title || "N/A Title",
            documentLink: d.Link || "#",
            sourceType: "Journal", 
          };
        });
      } catch (error) {
        console.error("Failed to load or parse journal CSV data:", error);
      }
      
      // B. Load OSDR Data
      try {
          osdrData = await fetchOSDRData(); 
      } catch (error) {
          console.error("Failed to fetch OSDR data:", error);
          // Continue even if OSDR fails, but with an empty array
      }
      
      // C. Merge and Store
      const mergedData = [...journalData, ...osdrData];

      setAllData(mergedData);
      setIsLoading(false);
      // setFilteredData will be updated in the next effect cycle
    };

    loadAllData();
  }, []);

  // --- 2. Filter/Search Logic (Updates filteredData and resets Page) ---
  useEffect(() => {
    const applyFiltersAndSearch = setTimeout(() => {
      if (isLoading && allData.length === 0) {
        return;
      }
      
      let currentFiltered = allData;

      // 1. SOURCE FILTER
      if (filters.source !== "all") {
        currentFiltered = currentFiltered.filter(
          (item) =>
            item.sourceType && item.sourceType.toLowerCase() === filters.source.toLowerCase()
        );
      }
      
      // 2. TEXT SEARCH - ONLY SEARCHING ON 'title'
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        currentFiltered = currentFiltered.filter(
          (item) => item.title.toLowerCase().includes(lowerSearchTerm)
        );
      }

      // 3. YEAR FILTER - ❌ STILL REMOVED (No item.publicationDate)
      
      // 🚀 IMPORTANT: Reset page to 1 after new filter/search
      setCurrentPage(1); 
      
      setFilteredData(currentFiltered);
      setTotalResults(currentFiltered.length);
      
    }, 300);

    return () => clearTimeout(applyFiltersAndSearch);
  }, [searchTerm, filters, allData, isLoading]);
  
  // --- 3. Pagination Logic (Updates results based on page and filters) ---
  useEffect(() => {
    const start = (currentPage - 1) * RESULTS_PER_PAGE;
    const end = start + RESULTS_PER_PAGE;
    
    // Slice the already filtered data
    const paginatedResults = filteredData.slice(start, end);

    setResults(paginatedResults);

  }, [filteredData, currentPage]);


  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Optionally scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Calculate total pages for pagination control
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setSearchTerm={setSearchTerm} />
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-6 flex flex-col md:flex-row gap-8">
        {/* Left Column: FilterSidebar */}
        <div className="w-full md:w-64">
          <div className="md:sticky md:top-6 bg-white p-4 rounded shadow-md border border-gray-200">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearchSubmit={setSearchTerm}
              // Ensure FilterSidebar has 'Journal', 'OSDR', and 'all' options
            />
          </div>
        </div>

        {/* Right Column: Results List */}
        <div className="w-full md:flex-1 bg-white p-6 rounded shadow-md border border-gray-200">
          <ResultsList
            results={results}
            isLoading={isLoading}
            totalResults={totalResults}
            searchTerm={searchTerm}
            
            // 🚀 NEW: Pagination Props for ResultsList to handle controls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <footer className="w-full mt-10 py-4 text-center text-sm text-gray-500 border-t border-gray-200">
        Data sources: Journal CSV and NASA OSDR Live Data.
      </footer>
    </div>
  );
};

export default SpaceBiologyEngine;