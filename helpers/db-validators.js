const Role = require('../models/role');
const User = require('../models/user');


const roleIsValid = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`Role ${role} does not exist`);
    }
};

const emailIsValid = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`Email ${email} already exists`);
    }
};

const userExistsById = async (id = '') => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`User with id ${id} does not exist`);
    }
};


module.exports = {
    roleIsValid,
    emailIsValid,
    userExistsById
};