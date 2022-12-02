'use strict';
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');
const {makeThumbnail, getCoordinates} = require('../utils/image');

const getCats = async (req, res) => {
  const cats = await catModel.getAllCats(res);
  cats.map(cat => {
    // convert birthdate date object to 'YYYY-MM-DD' string format
    cat.birthdate = cat.birthdate.toISOString().split('T')[0];
    return cat;
  });
  res.json(cats);
};

const getCat = async (req, res) => {
  // choose only one object with matching id
  const cat = await catModel.getCatById(res, req.params.catId);
  if (cat) {
    // convert date object to 'YYYY-MM-DD' format
    cat.birthdate = cat.birthdate.toISOString().split('T')[0];
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const createCat = async (req, res) => {
  const errors = validationResult(req);
  // File is empty or missing (not passing multer's fileFilter in route)
  if (!req.file) {
    res.status(400).json({message: 'file missing or invalid'});
  }
  else if (errors.isEmpty()) {
    const cat = req.body;
    await makeThumbnail(req.file.path, req.file.filename);
    // TODO: use image.js/getCoord to extract exif-data/gps coords and add
    // to the cat object as cat.coords property in array format (stringified)
    cat.coords = JSON.stringify(await getCoordinates(req.file.path));
    cat.owner = req.user.user_id;
    cat.filename = req.file.filename;
    console.log('creating a new cat:', cat);
    const catId = await catModel.addCat(cat, res);
    res.status(201).json({message: 'cat created', catId});
  } else {
    console.log('validation errors', errors);
    res.status(400).json({message: 'cat creation failed',
                          errors: errors.array()});
  }
};

const modifyCat = async (req, res) => {
  const cat = req.body;
  const user = req.user;
  if (req.params.catId) {
    cat.id = req.params.catId;
  }
  //console.log('user', user, 'modifies cat:', cat);
  const result = await catModel.updateCatById(cat, user, res);
  // here is different
  //const result = await catModel.updateCatById(cat, req.user.user_id, req.user.role, res);
  if (result.affectedRows > 0) {
    res.json({message: 'cat modified: ' + cat.id});
  } else {
    res.status(404).json({message: 'nothing changed'});
  }
};

const deleteCat = async (req, res) => {
  const result = await catModel.deleteCatById(req.params.catId, req.user.user_id, req.user.role, res);
  if (req.user.role == 0) {
    console.log('cat deleted by admin', result)
    if (result.affectedRows > 0) {
      res.json({message: 'cat deleted by admin'});
    } else {
      res.status(401).json({message: 'cat deleted failed'});
    }
  } else {
    console.log('cat deleted by user', result)
    if (result.affectedRows > 0) {
      res.json({message: 'cat deleted'});
    } else {
      res.status(401).json({message: 'cat deleted failed'});
    }
  }
  
};

module.exports = {
  getCat,
  getCats,
  modifyCat,
  createCat,
  deleteCat
};