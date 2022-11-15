'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/'});

router.get('/', catController.getCats)
  .get('/:catId', catController.getCat)
  .post('/', upload.single('cat'), catController.createCat)
  .put('/', (req, res) => {
    res.send('From this endpoint you can edit cats.')
  })
  .delete('/:catId', catController.deleteCat);
  
module.exports = router;