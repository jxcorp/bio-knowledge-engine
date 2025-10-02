// src/SpaceBiologyEngine.js

import React, { useState, useEffect } from 'react';
import * as dsv from 'd3-dsv'; 
import FilterSidebar from '../components/FilterSidebar'; 
import Header from '../components/Header';
import ResultsList from '../components/Searchresults';

// 1. Import all static data sources
import journalDataCSV from '../data/journals.csv'; 
import osdDataJSON from '../data/osd.json'; // Local JSON file


const SpaceBiologyEngine = () => {
    
    const [allData, setAllData] = useState([]); 
    const [results, setResults] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        categories: [], 
        yearStart: 2000,
        yearEnd: new Date().getFullYear(),
        // Note: The 'source' filter must match the sourceType string
        source: 'all', 
    });
    const [isLoading, setIsLoading] = useState(true); 
    const [totalResults, setTotalResults] = useState(0);

    // =================================================================
    // STEP 1: LOAD AND NORMALIZE ALL STATIC DATA (CSV + JSON)
    // =================================================================
    useEffect(() => {
        const loadAndMergeData = async () => {
            setIsLoading(true);
            let journalData = [];

            // --- A. Load and Normalize CSV Data ---
            try {
                const response = await fetch(journalDataCSV);
                const csvText = await response.text();

                journalData = dsv.csvParse(csvText, (d, i) => {
                    const journalYear = d.Year ? parseInt(d.Year) : new Date().getFullYear();
                    return {
                        id: `journal-${i}`, 
                        title: d.Title || 'N/A Title', 
                        documentLink: d.Link || '#',
                        publicationDate: `${journalYear}-01-01`, 
                        mission: 'N/A (Journal/Publication)', 
                        project_title: d.JournalName || 'N/A Journal',
                        sourceType: 'Journal', // Source 1
                        // Ensure authors field is consistent with PaperCard.js
                        authors: d.Authors ? d.Authors.split(';') : [],
                        subjectCategories: ['General Journal'], // Ensure PaperCard can read this
                        abstract: 'Journal article abstract not provided in CSV data.',
                    };
                });
            } catch (error) {
                console.error("Failed to load or parse journal CSV data:", error);
            }

            // --- B. Normalize OSD Data from Local JSON File ---
            let osdData = [];
            
            try {
                const rawOSDResults = osdDataJSON.results || []; 
                
                osdData = rawOSDResults.map(studySummary => {
                    const accession = studySummary.id.accession;
                    const studyTitle = studySummary.study_title || `OSDR Study: ${accession}`;
                    const missionName = studySummary.mission?.name || 'Unknown Mission';
                    
                    return {
                        id: accession,
                        title: studyTitle, 
                        documentLink: studySummary.rest_url || `https://osdr.nasa.gov/bio/repo/data/studies/${accession}`,
                        publicationDate: studySummary.start_date ? new Date(studySummary.start_date).toISOString().split('T')[0] : '2010-01-01',
                        mission: missionName, 
                        project_title: studySummary.project_title || studyTitle,
                        sourceType: 'OSDR', 
                        
                       
                        abstract: studySummary.study_title,
                        subjectCategories: ['Space Biology', studySummary.organism].filter(Boolean), // Use organism as a category
                        
                        
                        authors: studySummary.publication 
                            ? studySummary.publication.flatMap(p => p['author list']).filter(a => a) 
                            : [],
                    };
                });
            } catch (error) {
                 console.error("Failed to parse OSD JSON data:", error);
            }
            console.log(osdData)
            // --- C. Merge All Data ---
            const mergedData = [...journalData, ...osdData];
            
            setAllData(mergedData);
            setIsLoading(false);
        };

        loadAndMergeData();
    }, []); 

    
    // =================================================================
    // STEP 2: SEARCH AND FILTER LOGIC (Now correctly filters 'OSDR')
    // =================================================================

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (isLoading || allData.length === 0) {
                if (!isLoading && allData.length === 0) {
                     setResults([]);
                     setTotalResults(0);
                }
                return;
            }

            let filtered = allData;

            // 1. TEXT SEARCH
            if (searchTerm) {
                const lowerSearchTerm = searchTerm.toLowerCase();
                filtered = filtered.filter(item => 
                    item.title.toLowerCase().includes(lowerSearchTerm) ||
                    (item.mission && item.mission.toLowerCase().includes(lowerSearchTerm)) || 
                    (item.project_title && item.project_title.toLowerCase().includes(lowerSearchTerm)) 
                );
            }

            // 2. YEAR FILTER
            filtered = filtered.filter(item => {
                const itemYear = new Date(item.publicationDate).getFullYear();
                return itemYear >= filters.yearStart && itemYear <= filters.yearEnd;
            });
            
            // 3. SOURCE FILTER (Correctly uses the 'OSDR' sourceType)
            if (filters.source !== 'all') {
                filtered = filtered.filter(item => 
                    item.sourceType.toLowerCase() === filters.source.toLowerCase()
                );
            }

            setResults(filtered);
            setTotalResults(filtered.length);
        }, 300); 

        return () => clearTimeout(delaySearch);
    }, [searchTerm, filters, allData, isLoading]); 

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

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
                            // NOTE: You must update FilterSidebar to include "OSDR" as a source option
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
                    />
                </div>
            </div>
            <footer className="w-full mt-10 py-4 text-center text-sm text-gray-500 border-t border-gray-200">
                Data sources: Journal CSV and OFFLINE NASA OSDR Studies.
            </footer>
        </div>
    );
};

export default SpaceBiologyEngine;