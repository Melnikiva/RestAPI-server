const CompositionRepository = require('../repositories/compositionRepository');

const compositionRepository = new CompositionRepository('/home/melnik/webprogbase/labs/lab2/data/compositions.json')
module.exports = {
    getCompositions(req, res) {
        res.send(compositionRepository.getCompositions());
    },

    getCompositionById(req, res) {
        const composition = compositionRepository.getCompositionById(parseInt(req.params.id));
        if (composition !== null)
            res.send(composition)
        else
            res.sendStatus(404);
    },

    postComposition(req, res) {
        try {
            const newComposition = compositionRepository.addComposition(req.body);
            res.send(newComposition);
            res.sendStatus(201);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    },

    deleteCompositionById(req, res) {
        try {
            const deleted = compositionRepository.deleteComposition(parseInt(req.params.id));
            deleted != null ? res.send(deleted) : res.sendStatus(404);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    },

    putComposition(req, res) {
        try {
            const composition = req.body;
            res.send(compositionRepository.updateComposition(composition));
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    }
}