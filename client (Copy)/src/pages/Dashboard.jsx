// src/SpaceBiologyEngine.js (Strictly Local UI State, Global Data Store)

import React, { useEffect, useState } from "react";
import * as dsv from "d3-dsv";
import { fetchOSDRData } from "../components/osdrdata"; 
import journalDataCSV from "../data/journals.csv"; 

import FilterSidebar from "../components/FilterSidebar";
import Header from "../components/Header";
import ResultsList from "../components/Searchresults";

// 🚀 IMPORT ZUSTAND GLOBAL STORE AND SHALLOW
import { useGlobalStore } from "../store/useGlobalStore"; 

// NOTE: RESULTS_PER_PAGE and all pagination constants/logic are removed.

const SpaceBiologyEngine = () => {
  
  // --- A. Local Component State (UI and Logic) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ source: 'all' });
  const [isLoading, setIsLoading] = useState(true);
  
  // Local state for total results, derived from the global filtered data length
  const totalResults = useGlobalStore(state => state.filteredData.length);


  // --- B. Global Zustand State (Raw and Processed Data Only) ---
  const { 
    allData, 
    filteredData, 
    results, // Kept to match the store structure, though effectively redundant without pagination
    
    setAllData, 
    setFilteredData, 
    setResults,
  } = useGlobalStore(state => ({
    allData: state.allData,
    filteredData: state.filteredData,
    results: state.results, // Using the final results array from the store
    
    setAllData: state.setAllData,
    setFilteredData: state.setFilteredData,
    setResults: state.setResults,
  })); 
  
  // NOTE: All previous utility setters (resetPaginationState, etc.) are GONE.

  
  // --- 1. Initial Data Load Effect (Fetches and sets allData in Zustand) ---
  useEffect(() => {
    const loadAllData = async () => {
      console.log("🚀 EFFECT 1: Loading All Data (Runs Once)");
      
      let journalData = [];
      let osdrData = [];

      /* try {
        const response = await fetch(journalDataCSV);
        const csvText = await response.text();
        journalData = dsv.csvParse(csvText, (d, i) => ({
            id: `journal-${i}`,
            title: d.Title || "N/A Title",
            documentLink: d.Link || "#",
            sourceType: "Journal",
        }));
      } catch (error) {
        console.error("Failed to load or parse journal CSV data:", error);
      } */

      /* try {
        osdrData = await fetchOSDRData(); 
      } catch (error) {
        console.error("Failed to fetch OSDR data:", error);
      } */

      const mergedData = [...journalData, ...osdrData];
      console.log(`EFFECT 1: Setting allData (${mergedData.length} items) and isLoading(false)`);
      
      // Set initial data in the store
      /* setAllData(mergedData);
      setFilteredData(mergedData); // Initialize filteredData immediately
      setResults(mergedData);  */     // Initialize results immediately (no slicing needed)
      
      setIsLoading(false);
    };

    loadAllData();
  }, [setAllData, setFilteredData, setResults]); // Setters are stable, but included for ESLint safety

 
  // --- 2. Filter/Search Logic (Updates filteredData and results in store) ---
  useEffect(() => {
    console.log("🔎 EFFECT 2 START: Apply Filters/Search. Dependencies:", {
      searchTerm, 
      source: filters.source, 
      allDataLength: allData.length
    });

    const applyFiltersAndSearch = setTimeout(() => {
      // Exit if data hasn't loaded yet
      if (allData.length === 0) return; 

      let currentFiltered = allData;

      // 1. SOURCE FILTER
      if (filters.source !== "all") {
        currentFiltered = currentFiltered.filter(
          (item) =>
            item.sourceType &&
            item.sourceType.toLowerCase() === filters.source.toLowerCase()
        );
      }

      // 2. TEXT SEARCH
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        currentFiltered = currentFiltered.filter((item) =>
          item.title.toLowerCase().includes(lowerSearchTerm)
        );
      }
      
      // Update state in the store: filteredData and results are now identical
      console.log(`EFFECT 2: SETTING filteredData & results (${currentFiltered.length})`);
      /* setFilteredData(currentFiltered);
      setResults(currentFiltered);  */

    }, 300);

    return () => {
      console.log("EFFECT 2: Cleanup (Clearing Timeout)");
      clearTimeout(applyFiltersAndSearch);
    };
    
  }, [searchTerm, filters.source, allData, setFilteredData, setResults]);


 


  // --- Handlers ---
  const handleFilterChange = (newFilters) => {
    // Uses local setFilters
 /*    setFilters(newFilters); */
    console.log(`HANDLER: setFilters called. New source: ${newFilters.source}`);
  };

  
  
  
  // --- Calculations for Props ---
/*   const isOSDRMode = filters.source.toLowerCase() === "osdr";
 */
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
            // PASSING results (which is the full filtered list)
            results={results} 
            totalResults={totalResults} 
            searchTerm={searchTerm} 
            
            
            
          />
        </div>
      </div>
      <footer className="w-full mt-10 py-4 text-center text-sm text-gray-500 border-t border-gray-200">
        Data sources: Journal CSV and NASA OSDR Live Data. (All pagination logic removed for debugging loop).
      </footer>
    </div>
  );
};

export default SpaceBiologyEngine;