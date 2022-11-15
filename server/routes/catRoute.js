'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');
const {body} = require('express-validator');

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (acceptedTypes.includes(file.mimetype)) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    // To reject this file pass `false', like so:
    cb(null, false);
  }
};

const upload = multer({ dest: 'uploads/', fileFilter});


router.get('/', catController.getCats)
  .get('/:catId', catController.getCat)
  .post('/', 
    body('name').isAlphanumeric(),
    body('birthdate').isDate(),
    body('weight').isFloat({min: 0.1, max: 30}),
    body('owner'). isInt({min:1}),
    upload.single('cat'), 
    catController.createCat)
  .put('/', (req, res) => {
    res.send('From this endpoint you can edit cats.')
  })
  .delete('/:catId', catController.deleteCat);
  
module.exports = router;