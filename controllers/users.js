const { response } = require('express');

const usersGet = (req, res = response) => {
    res.status(403).json({
        msg: 'get API from controller'
    })
}

const usersPost = (req, res = response) => {
    const { name, age } = req.body;
    const body = req.body;
    res.status(201).json({
        msg: 'post API',
        body,
        // name,
        // age
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