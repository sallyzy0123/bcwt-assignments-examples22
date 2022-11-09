'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/'});

// TODO
// - chain the router method calls

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);

router.post('/', upload.single('user'), userController.createUsers);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit users.')
    // TODO: replace with controller & data model
  });
  
router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete users.')
    // TODO: replace with controller & data model
});

module.exports = router;