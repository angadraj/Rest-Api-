const express = require('express');
const authRouter = express.Router();
const authControllerFns = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

authRouter.route('/signup')
.post(authControllerFns.signup);

authRouter.route('/login')
.post(authControllerFns.login);

authRouter.use(verifyToken);

authRouter.route('/logout')
.get(authControllerFns.logout);

module.exports = authRouter;