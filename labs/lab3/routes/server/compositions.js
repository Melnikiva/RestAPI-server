const router = require('express').Router();
const compositionController = require('../../controllers/server/compositions');

router.get('/', compositionController.renderCompositionsPage);

router.get('/:id', compositionController.renderCompositionPage);

module.exports = router;