import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Define the theme color as a constant
const NASA_BLUE = '#0B3D91';
const NASA_BLUE_HOVER = '#082D70'; // Slightly darker for hover effect

// The base URL for the remote Bio Knowledge Engine API
const BASE_API_URL = 'https://bio-knowledge-engine.onrender.com'; 

// Helper function to format keys (e.g., 'study_title' -> 'Study Title')
const formatKey = (key) => key.replace(/([A-Z])/g, ' $1').trim().replace(/_/g, ' ');

/* --- Helper Component: MetadataList (Clean, formal details block) --- */
const MetadataList = ({ metadata, excludeKeys = [] }) => {
  const data = metadata.data || metadata; 

  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return <p className="text-gray-500">No additional metadata available.</p>;
  }
  
  const filteredEntries = Object.entries(data).filter(([key, value]) => 
    !excludeKeys.includes(key) && typeof value !== 'object' && value !== null
  );

  if (filteredEntries.length === 0) {
     return <p className="text-gray-500">No additional metadata available.</p>;
  }

  return (
    <div className=" bg-white p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
            Additional Study Parameters
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {filteredEntries.map(([key, value]) => (
                <div key={key} className="pb-2 border-b border-gray-100">
                    {/* ACCENT COLOR: NASA_BLUE */}
                    <dt className="text-xs font-medium uppercase tracking-wider" style={{ color: NASA_BLUE }}>
                        {formatKey(key)}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-800 font-medium">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                    </dd>
                </div>
            ))}
        </dl>
    </div>
  );
};

/* --- Helper Component: FilesGrid (Matching new accent color) --- */
const FilesGrid = ({ files }) => {
  if (!files || files.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Associated Files</h2>
        <p className="text-gray-500 italic">No files found for this dataset.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Associated Files ({files.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200  p-5 shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div>
                {/* ACCENT COLOR: NASA_BLUE */}
                <p className="text-xs font-semibold uppercase" style={{ color: NASA_BLUE }}>{file.type || 'FILE'}</p>
                <h3 className="text-base font-medium text-gray-900 mt-1 break-words">
                  {file.file_name || 'Unnamed File'}
                </h3>
            </div>
            
            <div className="mt-4">
                {file.url && (
                    <a
                      href={file.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent  focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
                      // ACCENT COLOR: NASA_BLUE for background and hover
                      style={{ 
                          backgroundColor: NASA_BLUE, 
                          '--tw-ring-color': NASA_BLUE, // Custom property for focus ring
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = NASA_BLUE_HOVER}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = NASA_BLUE}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- Main Page Component --- */
const OSDRDetailsPage = () => {
    const { osdrId } = useParams(); 

  const [metadata, setMetadata] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... (fetch logic remains unchanged)
    const fetchDatasetDetails = async () => {
      setLoading(true);
      setError(null);

      const metadataUrl = `${BASE_API_URL}/dataset/${osdrId}/metadata/`;
      const filesUrl = `${BASE_API_URL}/dataset/${osdrId}/files`;

      try {
        const [metadataResponse, filesResponse] = await Promise.all([
          fetch(metadataUrl),
          fetch(filesUrl)
        ]);

        if (!metadataResponse.ok || !filesResponse.ok) {
          throw new Error(`Failed to fetch data: Metadata Status ${metadataResponse.status}, Files Status ${filesResponse.status}`);
        }

        const metadataJson = await metadataResponse.json();
        const filesJson = await filesResponse.json();

        setMetadata(metadataJson);
        
        const rawFiles = filesJson?.[osdrId]?.files;
        if (rawFiles) {
            const filesArray = Object.entries(rawFiles).map(([fileName, fileDetails]) => ({
                file_name: fileName,
                url: fileDetails.URL,
                rest_url: fileDetails.REST_URL,
                type: fileName.split('.').pop() 
            }));
            setFiles(filesArray);
        } else {
            setFiles([]);
        }

      } catch (err) {
        console.error("Fetch Error:", err);
        setError(`Could not load dataset details. Error: ${err.message}.`);
      } finally {
        setLoading(false);
      }
    };

    if (osdrId) {
      fetchDatasetDetails();
    }
  }, [osdrId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-8">
        {/* ACCENT COLOR: NASA_BLUE */}
        <p className="text-xl font-medium" style={{ color: NASA_BLUE }}>Loading dataset details for {osdrId}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto bg-white p-8  shadow-2xl">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Data</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  const coreMetadata = metadata?.[osdrId]?.metadata || metadata;
  
  // Extract key fields for prominent display
  const datasetTitle = coreMetadata['study publication title'] || `Dataset: ${osdrId}`;
  const authors = coreMetadata['study publication author list'] || 'N/A';
  const description = coreMetadata['study description'] || 'No study description provided.';
  
  // Keys to exclude from the main MetadataBlock because they are in the header
  const excludeFromBlock = ['study publication title', 'study publication author list', 'study description', 'name'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8"> 
      <div className="max-w-6xl mx-auto">

        {/* --- 1. Prominent Header Section (Title, Authors, Description) --- */}
        <header className="mb-10 bg-white  shadow-2xl overflow-hidden">
            
            {/* Top Bar for Context - ACCENT COLOR: NASA_BLUE */}
            <div className="text-white p-4 sm:p-6 flex justify-between items-center" style={{ backgroundColor: NASA_BLUE }}>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest opacity-80">
                    NASA Open Science Data Repository
                </p>
                <p className="text-xs font-semibold">ID: {osdrId}</p>
            </div>

            <div className="p-6 sm:p-8">
                {/* Title - ACCENT COLOR: NASA_BLUE for underline */}
                <h1 
                    className="text-xl sm:text-l lg:text-3xl font-extrabold text-gray-900 leading-tight border-b-4 pb-2" 
                    style={{ borderColor: NASA_BLUE }}
                >
                    {datasetTitle}
                </h1>
                
                {/* Authors */}
                <div className="mt-4 pt-2">
                    <p className="text-base sm:text-lg text-gray-700 font-medium">
                        <span className="font-bold text-gray-600 mr-2">Lead Authors:</span> 
                        {Array.isArray(authors) ? authors.join(', ') : authors}
                    </p>
                </div>

                {/* Description Box */}
                <div className="mt-6 bg-gray-50 border border-gray-200 p-4 ">
                    {/* ACCENT COLOR: NASA_BLUE */}
                    <h3 className="text-sm font-semibold uppercase mb-2" style={{ color: NASA_BLUE }}>Study Summary</h3>
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </header>

        {/* --- 2. Metadata Details Block --- */}
        <section className="mb-10">
          <MetadataList metadata={coreMetadata} excludeKeys={excludeFromBlock} />
        </section>

        {/* --- 3. Files Grid Section --- */}
        <section>
          <FilesGrid files={files} />
        </section>
      </div>
    </div>
  );
};

export default OSDRDetailsPage;