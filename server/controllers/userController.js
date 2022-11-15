'use strict';
// userController
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');
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
    // TODO
};

const createUsers = async (req, res) => {
    console.log('Creating an new user:',  req.body);
    const newUser = req.body;
    if (!newUser.role) {
        //default user role (normal user)
        newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (errors.isEmpty()) {
        const result = await userModel.addUser(newUser, res);
        res.status(201).json({message: 'user created', userId: result});
    } else {
        res.status(400).json({
            message: 'user creation failed', 
            errors: errors.array()
        });
    }
    
};

const deleteUsers = (req, res) => {
    // TODO
};

module.exports = {
    getUser,
    getUsers,
    modifyUsers,
    createUsers,
    deleteUsers
};