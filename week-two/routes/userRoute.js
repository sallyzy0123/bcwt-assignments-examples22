'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// TODO
// - Create user routes
// - Create user controller good
// - use the data available in userModel.js

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);

router.post('/', userController.createUsers);
  
router.put('/', (req, res) => {
    res.send('From this endpoint you can edit users.')
  });
  
router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete users.')
});

module.exports = router;