const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const bodyParser = require('body-parser');
const User = require('../models/user');

const parser = bodyParser.urlencoded({ extended: true });

/**
 * Get users response
 * @route GET /api/users
 * @group Users - user operations
 * @returns {Array.<User>} User - all users
 */
/**
 * Get user by id response
 * @route GET /api/users/{id}
 * @group Users - user operations
 * @params {integer} id.path.required - id of the User
 * @returns {User.model} 201 - User object
 * @returns {Error} 404 - User not found
 */
router.get('/', userController.getUsers)
      .get('/:id(\\d+)', userController.getUserById)
      .post('/', parser, userController.postUser)
      .delete('/:id(\\d+)', userController.deleteUserById)
      .put('/', parser, userController.postUser);

module.exports = router;