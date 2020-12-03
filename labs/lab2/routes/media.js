const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media');


/**
 * Upload media file
 * @route POST /api/media
 * @group Media - media operations
 * @param {file} file.file.required - file
 * @returns {integer} id - media id
 */

router.post('/', mediaController.uploadSingle('file-key'), mediaController.uploadMedia);

/**
 * Download media file
 * @route GET /api/media/{id}
 * @group Media - media operations
 * @param {string} id.path.required - file id
 * @returns {Media} Media - file
 */
router.get('/:id', mediaController.downloadMediaById);

module.exports = router;