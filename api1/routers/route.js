const express = require('express');
const api1Router = express.Router();

const tutorialsRouter = require('./tutorialsRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

api1Router.use('/auth', authRouter);
api1Router.use('/user', userRouter);
api1Router.use('/tutorials', tutorialsRouter);

module.exports = api1Router;