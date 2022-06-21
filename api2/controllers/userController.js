const { User } = require('../models/index');
const bcrypt = require('bcrypt');

module.exports.createUser = async function createUser(req, res) {
    try {
        if (!req.body.email && !req.body.password) {
            return res.status(400).json({
                message: "Please enter email & password"
            });
        }
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
        });
        return res.status(200).json({
            message: "user created",
            data: newUser
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.getAllUsers = async function getAllUsers(req, res) {
    try {
        const allUsers = await User.findAll();
        return res.status(200).json({
            message: "all users retrieved!",
            data: allUsers
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}