const express = require('express');
const userRouter = express.Router();
const { createUser, getAllUsers } = require('../controllers/userController');

userRouter.route('/')
.get(getAllUsers);

userRouter.route('/user')
.post(createUser);

module.exports = userRouter;