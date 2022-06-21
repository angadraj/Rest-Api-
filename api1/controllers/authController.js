const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');
const db = require('../models/index');
const user = db.user;

const authControllerFns = {
    signup: async function(req, res) {
        try {
            if (!req.body.email && !req.body.password) {
                return res.status(400).json({
                    message: "Please enter email and password!"
                });
            }
            const savedUser = await user.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                role: req.body.role ? 'admin' : 'user'
            });
            res.status(200).json({
                message: "User registered!",
                data: savedUser
            })
        
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    },
    
    login: async function(req, res) {
        try {
            if (!req.body.email && !req.body.password) {
                return res.status(400).json({
                    message: "Please enter email & password!"
                })
            }
            const userInDb = await user.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (!userInDb) {
                return res.status(404).json({
                    message: "User not found!"
                })
            }
            const validPassword = bcrypt.compareSync(req.body.password, userInDb.password);
            if (!validPassword) {
                return res.status(401).json({
                    message: "Wrong password"
                })
            }
            // make jwt token
            const token = jwt.sign({id: userInDb.id}, authConfig.secretKey, {
                expiresIn: 86400
            });
            // set token in response as well so that client gets
            res.setHeader('Authorization', 'Bearer ' + token);
            res.status(200).json({
                message: "user logged in",
                data: {
                    id: userInDb.id,
                    name: userInDb.name,
                    email: userInDb.email,
                    accessToken: token
                }
            })
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    },

    logout: async function(req, res) {
        try {
            const loggedInUser = await user.findOne({where: { id: req.userId }});
            // replace the token with expiration of 1 sec
            jwt.sign({id: req.userId}, authConfig.secretKey, {
                expiresIn: 1
            });
            res.status(200).json({
                message: "logged out!",
                data: [
                    loggedInUser.name,
                    loggedInUser.email
                ]
            });

        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    }
}

module.exports = authControllerFns;