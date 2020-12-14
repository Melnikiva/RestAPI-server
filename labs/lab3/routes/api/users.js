const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/users');
const bodyParser = require('body-parser');

const parser = bodyParser.urlencoded({ extended: true });

/**
 * Get all users
 * @route GET /api/users
 * @group Users - user operations
 * @returns {Array.<User>} User - all users
 */
router.get('/', userController.getUsers)

/**
 * Get user by id
 * @route GET /api/users/{id}
 * @group Users - user operations
 * @param {integer} id.path.required - id of the User
 * @returns {User.model} 200 - User object
 * @returns {Error} 404 - User not found
 */
router.get('/:id(\\d+)', userController.getUserById);

/**
 * Post user
 * @route POST /api/users
 * @group Users - user operations
 * @param {User.model} login.body.required - new User object
 * @returns {User.model} 201 - added User object
 */
router.post('/', parser, userController.postUser);

/**
 * Delete user by id
 * @route DELETE /api/users/{id}
 * @group Users - user operations
 * @param {integer} id.path.required - id of the User
 * @returns {User.model} 200 - deleted User object
 * @returns {Errror} 404 - User not found
 */
router.delete('/:id(\\d+)', userController.deleteUserById)

/**
 * Update user
 * @route PUT /api/users
 * @group Users - user operations
 * @param {User.model} id.body.required - updated User object
 * @returns {User.model} 200 - User updated
 */
router.put('/', parser, userController.putUser);

module.exports = router;