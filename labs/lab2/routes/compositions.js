const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const parser = bodyParser.urlencoded({ extended: true });

const compositionController = require('../controllers/compositions');

router.get('/', compositionController.getCompositions)
      .get('/:id(\\d+)', compositionController.getCompositionById)
      .post('/', parser, compositionController.postComposition)
      .delete('/:id(\\d+)', compositionController.deleteCompositionById)
      .put('/', parser, compositionController.putComposition);

module.exports = router;
