const express = require("express");
const cors = require("cors");

const datasetRoutes = require("./routes/DatasetRoutes");

const app = express();
const PORT = 5000;

// Config
const allowedOrigins = [
  'http://localhost:5173', 
  'https://jxcorp.github.io',
  'http://localhost:5173/bio-knowledge-engine',
  'https://jxcorp.github.io/bio-knowledge-engine/'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Routes
app.use("/", datasetRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`CORS Proxy Server running at http://localhost:${PORT}`);
  
});
