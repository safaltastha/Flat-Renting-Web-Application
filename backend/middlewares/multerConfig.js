// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = path.join(__dirname, '..', 'uploads', 'properties', 'images');
//     // Get entity type from the request body or other source
//     const entityType = req.body.entityType; // or however you're passing it

//     // Determine destination based on entity type and file type
//     if (entityType === 'property') {
//       if (file.mimetype.startsWith('image/')) {
//         cb(null, 'uploads/properties/images/');
//       } else if (file.mimetype.startsWith('video/')) {
//         cb(null, 'uploads/properties/videos/');
//       } else {
//         cb(new Error('Invalid file type for property'), null);
//       }
//     } else if (entityType === 'vehicle') {
//       if (file.mimetype.startsWith('image/')) {
//         cb(null, 'uploads/vehicles/images/');
//       } else if (file.mimetype.startsWith('video/')) {
//         cb(null, 'uploads/vehicles/videos/');
//       } else {
//         cb(new Error('Invalid file type for vehicle'), null);
//       }
//     } else {
//       cb(new Error('Invalid entity type'), null);
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Create the Multer upload instance
// const upload = multer({ storage });

// module.exports = upload;



const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const entityType =  req.body.entityType ; // Get entity type from the request
    let dir;

    console.log(entityType, 'éntity type')

    // Set directory path based on entity type and file type
    if (entityType === 'property') {
      if (file.mimetype.startsWith('image/')) {
        dir = path.join(__dirname, '..', 'uploads', 'properties', 'images');
      } else if (file.mimetype.startsWith('video/')) {
        dir = path.join(__dirname, '..', 'uploads', 'properties', 'videos');
      } else {
        return cb(new Error('Invalid file type for property'));
      }
    } else if (entityType === 'vehicle') {
      if (file.mimetype.startsWith('image/')) {
        dir = path.join(__dirname, '..', 'uploads', 'vehicles', 'images');
      } else if (file.mimetype.startsWith('video/')) {
        dir = path.join(__dirname, '..', 'uploads', 'vehicles', 'videos');
      } else {
        return cb(new Error('Invalid file type for vehicle'));
      }
    } else {
      return cb(new Error('Invalid entity type'));
    }

    // Ensure directory exists
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the Multer upload instance
const upload = multer({ storage });

module.exports = upload;
