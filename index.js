require('dotenv').config();

var express = require('express');
var cors = require('cors');
var multer = require('multer');

var app = express();

// Multer configuration for file uploads
var upload = multer({ dest: 'uploads/' });

// Enable CORS
app.use(cors());

// Serve files inside the public folder
app.use('/public', express.static(process.cwd() + '/public'));

// Homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File Metadata API
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({
      error: 'No file uploaded'
    });
  }

  // Return the uploaded file metadata
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start the server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});