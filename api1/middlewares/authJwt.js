const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');
const db = require('../models/index');
const user = db.user;

function verifyToken(req, res, next) {
    try {
        console.log(req.headers);
        let header = req.headers['x-access-token'] || req.headers['authorization'];
        if (!header) {
            return res.status(401).json({
                message: "Please login!"
            })
        }
        let token = header.split(" ")[1];
        if (!token) {
            return res.status(403).json({
                message: "Please login!"
            })
        }
        jwt.verify(token, authConfig.secretKey, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: "Token invalid!"
                })
            }
            req.userId = decoded.id;
            next();
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

async function isAdmin(req, res, next) {
    try {
        const role = await user.findOne({where: {id: req.userId}}).role;
        if (role == 'admin') {
            res.status(200).json({
                message: "welcome admin!"
            })
            next();
        } else {
            res.status(403).json({
                message: "Only admin allowed!"
            });
        }

    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = {
    verifyToken,
    isAdmin
}