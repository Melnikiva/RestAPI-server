const router = require('express').Router();
const userController = require('../../controllers/server/users');

router.get('/', userController.renderUsersPage);

router.get('/:id', userController.renderUserPage);

module.exports = router;