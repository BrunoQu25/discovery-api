const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getQuery,
  uploadDocument,
  uploadBinary,
  saveFilename,
} = require("../useCases/discoveryQuery/discoveryController");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\ /g, ""));
  },
});
var upload = multer({ storage: storage });

router.get("/getQuery", getQuery);
router.post("/addDocument", upload.array("file"), uploadDocument);
router.post("/addBinary", uploadBinary);
router.post("/saveFilename", saveFilename);

module.exports = router;
