'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async (res,userId) => {
  try {
    const sql = 'SELECT * FROM wop_user';
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

const getUserById = async (res, userId) => {
  try {
    const sql = 'SELECT user_id, name, email, role FROM wop_user WHERE user_id =' + userId;
    const [rows] = await promisePool.query(sql);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

const addUser = async (user, res) => {
  try {
    const sql = 'INSERT INTO wop_user VALUES (null, ?, ?, ?, ?)';
    const values = [user.name, user.email, user.passwd, user.role];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}


module.exports = {
  getAllUsers,
  getUserById,
  addUser
};
