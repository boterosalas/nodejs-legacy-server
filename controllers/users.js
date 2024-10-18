const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');



const usersGet = (req, res = response) => {
    res.status(403).json({
        msg: 'get API from controller'
    })
}

const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    userpassword = bcryptjs.hashSync(password, salt);

    // Save in DB
    await user.save();
    res.status(201).json({
        user
    });
}

const usersPut = (req, res = response) => {
    const id = req.params.id;
    const { name = 'No name', age = 'No age' } = req.query;
    res.status(403).json({
        msg: 'put API',
        id,
        name,
        age
    })
}

const usersDelete = (req, res = response) => {
    res.status(403).json({
        msg: 'delete API'
    })
}

const usersPatch = (req, res = response) => {
    res.status(403).json({
        msg: 'patch API'
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}