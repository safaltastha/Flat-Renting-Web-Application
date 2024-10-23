const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images/'); 
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, 'uploads/videos/'); 
    } else {
      cb(new Error('Invalid file type'), null);
    }
  },
  filename: (req, file, cb) => {
    
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the Multer upload instance
const upload = multer({ storage });

module.exports = upload;
