const router = require('express').Router();
const compositionController = require('../../controllers/server/compositions');

const MediaRepository = require('../../repositories/mediaRepository');
const mediaRepository = new MediaRepository('./data/media');

router.get('/', compositionController.renderCompositionsPage);

router.get('/new', compositionController.renderNew);

router.get('/:id', compositionController.renderCompositionPage);

router.post('/new', mediaRepository.uploadMedia('image'), compositionController.postComposition);

router.post('/:id', compositionController.deleteComposition);

module.exports = router;