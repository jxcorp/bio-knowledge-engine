// src/SpaceBiologyEngine.js (Integrated Engine with Load More Logic)

import React, { useState, useEffect, useCallback } from "react";
import * as dsv from "d3-dsv";
import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import ResultsList from "../components/Searchresults";
import { fetchOSDRData } from "../components/osdrdata"; // Import OSDR fetcher

// 1. Import all static data sources
import journalDataCSV from "../data/journals.csv";

const RESULTS_PER_PAGE = 10; // Define increment constant

const SpaceBiologyEngine = () => {
  // allData now holds the MERGED, UNFILTERED data (Journal + OSDR)
  const [allData, setAllData] = useState([]);
  
  // filteredData holds the data after text search and source/year filtering
  const [filteredData, setFilteredData] = useState([]); 
  
  // results holds the final SLICED data for display (Load More logic)
  const [results, setResults] = useState([]); 
  
  const [searchTerm, setSearchTerm] = useState("");
  
  // 🚀 REPLACEMENT FOR currentPage: State for how many items to display
  const [itemsToDisplay, setItemsToDisplay] = useState(RESULTS_PER_PAGE); 
  
  const [filters, setFilters] = useState({
    categories: [],
    yearStart: 2000, 
    yearEnd: new Date().getFullYear(),
    source: "journal", 
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  // --- Utility 1: Reset Display State (Use useCallback for stability) ---
  const resetDisplayState = useCallback((totalCount) => {
      setItemsToDisplay(RESULTS_PER_PAGE); // Reset count to initial 10
      setTotalResults(totalCount);
  }, []); // Stable function

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
            authors:[],
            startdate:"",
            enddate:"",
            publicationDate:"",
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
      }
      
      // C. Merge and Store
      const mergedData = [...journalData, ...osdrData];
      console.log(mergedData);
      setAllData(mergedData);
      setIsLoading(false);
    };

    loadAllData();
  }, []);

  // --- 2. Filter/Search Logic (Updates filteredData and resets Display Count) ---
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
      
      // 3. RESET Display Count and Total Results
      resetDisplayState(currentFiltered.length);
      
      // 4. Update the filtered data
      setFilteredData(currentFiltered);
      
    }, 300);

    return () => clearTimeout(applyFiltersAndSearch);
    // Include resetDisplayState as a dependency since it is defined via useCallback
  }, [searchTerm, filters, allData, isLoading, resetDisplayState]);
  
  // --- 3. Slicing Logic (Updates results based on itemsToDisplay) ---
  useEffect(() => {
    
    // Slice the filtered data based on the current itemsToDisplay count
    // This is the core "Load More" mechanism
    const slicedResults = filteredData.slice(0, itemsToDisplay);

    setResults(slicedResults);

    
  }, [filteredData, itemsToDisplay]);


  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
   
  };

const handleLoadMoreAction = useCallback(async () => {
    
    const isOSDRMode = filters.source.toLowerCase() === "osdr";
    
    if (isOSDRMode) {
        // --- 1. SERVER-SIDE FETCHING (OSDR MODE) ---
        console.log("LOAD MORE: Fetching next batch from OSDR API...");

       
        
        const osdrItemsInAllData = allData.filter(item => item.sourceType.toLowerCase() === 'osdr').length;
        const offset = osdrItemsInAllData; 
        const limit = RESULTS_PER_PAGE;
        
        setIsLoading(true);

        try {
            const newOSDRData = await fetchOSDRData(offset, limit);
            
            
            if (newOSDRData.length > 0) {
                
                
                const updatedAllData = [...allData, ...newOSDRData];
                setAllData(updatedAllData);
                console.log(allData);
                setItemsToDisplay((prevCount) => prevCount + RESULTS_PER_PAGE);
           
            } else {
                 console.log("LOAD MORE: No new data returned from OSDR.");
                 
            }

        } catch (error) {
            console.error("Failed to fetch more OSDR data:", error);
        } finally {
            setIsLoading(false);
        }

    } else {
        // --- 2. CLIENT-SIDE SLICING (JOURNAL / ALL MODE) ---
        console.log("LOAD MORE: Incrementing client-side slice count...");
        setItemsToDisplay((prevCount) => prevCount + RESULTS_PER_PAGE); 
    }
    
    // Always scroll to provide visual feedback, regardless of the method
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

// Add necessary state dependencies
}, [allData, filters.source, fetchOSDRData, setIsLoading, setAllData]); 


  const showLoadMore = results.length < totalResults;

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
            
            // 🚀 UPDATED PROPS: Pass Load More data instead of pagination data
            showLoadMore={showLoadMore}
            onLoadMore={handleLoadMoreAction}
            
            // Note: ResultsList will need to be updated to use these props 
            // and hide its old pagination controls.
            // (If the original ResultsList code is used, it will ignore these props)
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