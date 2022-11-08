'use strict';
// userController
const userModel = require('../models/userModel');
const users = userModel.users;

const getUsers = async (req, res) => {
    const users = await userModel.getAllUsers(res);
    // remove the password property from all user items in the array
    users.map(user => {
        delete user.password;
        return user;
    })
    res.json(users);
};

const getUser = async (req, res) => {
    const user = await userModel.getUserById(res, req.params.userId);
    if (user) {
        delete user.password;
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

const modifyUsers = (req, res) => {
    
};

const createUsers = async (req, res) => {
    console.log('Creating an new user:',  req.body);
    const newUser = req.body;
    const result = await userModel.addUser(newUser, res);
    res.status(201).json({userId: result});
};

const deleteUsers = (req, res) => {
    
};

module.exports = {
    getUser,
    getUsers,
    modifyUsers,
    createUsers,
    deleteUsers
};