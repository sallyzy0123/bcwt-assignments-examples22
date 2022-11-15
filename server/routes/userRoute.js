'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/userController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/'});


router.get('/', userController.getUsers)
  .get('/:userId', userController.getUser)
  .post('/', 
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('passwd').isLength({min: 8}),
    userController.createUsers)
  .put('/', (req, res) => {
    res.send('From this endpoint you can edit users.')
    // TODO:replace with controller & data model
  })
  .delete('/', (req, res) => {
    res.send('From this endpoint you can delete users.')
    // TODO:replace with controller & data model
});

module.exports = router;