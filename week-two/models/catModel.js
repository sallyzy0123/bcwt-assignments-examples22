// ./models/catModel.js
"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res, catId) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT * FROM wop_cat");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getCatById = async (res, catId) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT * FROM wop_cat WHERE cat_id = ?", [catId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addCat = async (cat, res) => {
  try {
    console.log('addCat():', cat )
    const sql = 'INSERT INTO wop_cat VALUES (NULL, ?, ?, ?, ?, ?)';

    const values = [cat.name, cat.weight, cat.owner, cat.filename, cat.birthdate]; 
    const [result] = await promisePool.query(sql, values);
    return result.insertId; 
  }catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};


const deleteCatById = async (catId, res) => {
  try {
    const [rows] = 
      await promisePool.query("DELETE FROM wop_cat WHERE cat_id = ?", [catId]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

module.exports = {
  getAllCats,
  getCatById,
  addCat,
  deleteCatById
};