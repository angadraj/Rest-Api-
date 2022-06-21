const express = require('express');
const tutRouter = express.Router();
const { createTut, findAll, findOne, update, deleteOne, deleteAll, findAllPublished } = require('../controllers/tutorialsController');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

tutRouter.use(verifyToken);

tutRouter.route('/published')
.get(findAllPublished);

tutRouter.route('/')
.get(findAll)
.post(createTut)
.delete(deleteAll);

tutRouter.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteOne);

module.exports = tutRouter;