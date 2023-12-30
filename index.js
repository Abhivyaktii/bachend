const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3001;
const path = require('path');

// Enable CORS for all routes
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
// Set up Multer to handle file uploads and save to disk
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Specify the directory where you want to save the uploaded files
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     // Specify how the uploaded files should be named
//     cb(null, file.originalname);
//   }
// });

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file; // This contains the file data

  // Process the file as needed (e.g., save to disk, perform some operation)
  // For demonstration purposes, we'll just send back a JSON response with the file details.
  const result = res.json({ filename: file.originalname, size: file.size });
  return result;
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
