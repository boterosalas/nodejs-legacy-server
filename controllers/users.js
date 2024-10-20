const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');



const usersGet = async (req, res = response) => {
    const { from = 0, limit = 5 } = req.query;
    const query = {
        role: { $ne: 'ADMIN_ROLE' },
        status: true
    };
    const [totalUsers, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).limit(limit).skip(from)
    ]);
    res.status(200).json({ totalUsers, users });
}

const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    userpassword = bcryptjs.hashSync(password, salt);

    // Save in DB
    await user.save();
    res.status(201).json(user);
}

const usersPut = async (req, res = response) => {
    const id = req.params.id;
    const {
        _id,
        password,
        google,
        email,
        ...rest
    } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const userDB = await User.findByIdAndUpdate(id, rest);
    res.status(200).json(userDB)
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    const currentUser = await User.findByIdAndUpdate(id, { status: false });
    res.status(200).json(currentUser);
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