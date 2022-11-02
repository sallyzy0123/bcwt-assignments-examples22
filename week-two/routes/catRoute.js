'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/'});

router.get('/', catController.getCats);
  
router.get('/:catId', catController.getCat);
  
router.post('/', upload.single('cat'), catController.createCat);
  
router.put('/', (req, res) => {
    res.send('From this endpoint you can edit cats.')
  });
  
router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete cats.')
});
  
module.exports = router;