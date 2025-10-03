const express = require("express");
const {
  getAllDatasets,
  proxyDatasetRequest,
} = require("../controller/DatasetController");

const router = express.Router();

// Route for all datasets
router.get("/datasets", getAllDatasets);

// Route for any dataset subpath
router.use("/dataset", proxyDatasetRequest);


module.exports = router;
