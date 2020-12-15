const express = require('express');
const router = express.Router();


const compositionController = require('../../controllers/api/compositions');

/**
 * Get all compositions
 * @route GET /api/compositions
 * @group Compositions - composition operations
 * @returns {Array.<Composition>} Composition - all compositions
 */
router.get('/', compositionController.getCompositions);

/**
 * Get composition by id
 * @route GET /api/compositions/{id}
 * @group Compositions - composition operations
 * @param {integer} id.path.required - Composition id
 * @returns {Composition.model} 200 - Composition object
 * @returns {Error} 404 - Composition not found
 */
router.get('/:id(\\d+)', compositionController.getCompositionById);

/**
* Post composition
* @route POST /api/compositions
* @group Compositions - composition operations
* @param {Composition.model} title.body.required - new Composition object
* @returns {Composition.model} 201 - added Composition object
*/
router.post('/', compositionController.postComposition);

/**
 * Delete composition by id
 * @route DELETE /api/compositions/{id}
 * @group Compositions - composition operations
 * @param {integer} id.path.required - Composition id
 * @returns {Composition.model} 200 - deleted Composition object
 * @returns {Errror} 404 - Composition not found
 */
router.delete('/:id(\\d+)', compositionController.deleteCompositionById)

/**
 * Update composition
 * @route PUT /api/compositions
 * @group Compositions - composition operations
 * @param {Composition.model} id.body.required - updated Composition object
 * @returns {Composition.model} 200 - Composition updated
 */
router.put('/', compositionController.putComposition);

module.exports = router;
