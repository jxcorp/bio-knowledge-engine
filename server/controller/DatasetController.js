// const OSDR_API_BASE_URL is assumed to be defined globally or passed in, 
// but for this example, we'll define it locally again.
const OSDR_API_BASE_URL = "https://visualization.osdr.nasa.gov/biodata/api/v2";

// Use 'require' instead of 'import'
const axios = require("axios"); 

// Controller: Get all datasets
const getAllDatasets = async (req, res) => {
 
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0; 
  
  const datasetListUrl = `${OSDR_API_BASE_URL}/datasets`;
  console.log(`[PROXY] Step 1: Fetching all dataset IDs from: ${datasetListUrl}`);

  try {
    
    const listResponse = await axios.get(datasetListUrl);
    const rawDatasetsObject = listResponse.data || {};
    
   
    const datasetIds = Object.entries(rawDatasetsObject).map(([id, details]) => ({
      id,
      restUrl: details.REST_URL,
      metadataUrl: `${OSDR_API_BASE_URL}/dataset/${id}/metadata/`,
    }));

    const limitedDatasetIds = datasetIds.slice(offset, offset + limit);

    console.log(`[PROXY] Step 2: Fetching metadata for ${limitedDatasetIds.length} datasets...`);
    
    const metadataPromises = limitedDatasetIds.map(async (dataset) => {
      try {
        const metadataResponse = await axios.get(dataset.metadataUrl);
        // Correctly access the nested 'metadata' object
        const rawMetadata = metadataResponse.data[dataset.id].metadata;
        
        
        // 🚀 FIX: Use BRACKET notation for keys with spaces/special characters
        const title = 
            rawMetadata["study publication title"] || // Use the publication title (often best)
            rawMetadata["study title"] ||             // Fallback to the general study title
            `OSDR Study: ${dataset.id}`;              // Final fallback
        
        // Extract Document Link (using bracket notation for safety, though these keys don't have spaces)
        const documentLink = 
            rawMetadata["project link"] || 
            dataset.restUrl || 
            `#${dataset.id}`;

        // Extract and format public release date
        const publicDateTimestamp = rawMetadata.study_public_release_date;
        const publicationDate = publicDateTimestamp 
            ? new Date(publicDateTimestamp * 1000).toISOString().split('T')[0]
            : null;

        return {
          id: dataset.id,
          title: title,
          documentLink: documentLink,
          publicationDate: publicationDate,
          sourceType: "OSDR",
        };
      } catch (metadataError) {
        console.warn(`Warning: Failed to fetch metadata for ${dataset.id}. Skipping. Error: ${metadataError.message}`);
        
        return {
          id: dataset.id,
          title: `OSDR Study: ${dataset.id} (Metadata Fetch Failed)`,
          documentLink: dataset.restUrl,
          sourceType: "OSDR",
        };
      }
    });

    let finalResults = await Promise.all(metadataPromises);
    
    finalResults = finalResults.filter(result => result !== null);

    res.json(finalResults);

  } catch (error) {
    console.error(`Error in getAllDatasets aggregation: ${error.message}`);
    res.status(error.response?.status || 500).json({
      error: "Failed to aggregate datasets and metadata from external API.",
      details: error.message,
    });
  }
};



const proxyDatasetRequest = async (req, res) => {
  // req.originalUrl will start with /datasets or similar, we need to remove /api/v1/datasets/
  // Assuming the route is something like app.get('/api/v1/datasets/*', proxyDatasetRequest);
  
  // Use req.params if the route is defined to capture the dynamic part, 
  // but sticking to your original logic for now:
  const nasaPath = req.originalUrl.replace('/api/v1', ''); // A common fix for proxy routes
  const externalUrl = `${OSDR_API_BASE_URL}${nasaPath}`;
  
  console.log(`[PROXY] Forwarding to: ${externalUrl}`);

  try {
    const apiResponse = await axios.get(externalUrl, {
      params: req.query, // forward query params too
    });
    res.json(apiResponse.data);
  } catch (error) {
    console.error(`Proxy error for ${externalUrl}: ${error.message}`);
    res.status(error.response?.status || 500).json({
      error: "Proxy request failed",
      details: error.message,
    });
  }
};

// 🌟 FIX: Use CJS syntax for module exports
module.exports = {
  getAllDatasets,
  proxyDatasetRequest,
};