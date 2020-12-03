const CompositionRepository = require('../repositories/compositionRepository');
const compositionRepository = new CompositionRepository('./data/compositions.json')

module.exports = {
    getCompositions(req, res) {
        res.send(compositionRepository.getCompositions());
    },

    getCompositionById(req, res) {
        try {
            const composition = compositionRepository.getCompositionById(parseInt(req.params.id));
            if (composition !== null) {
                res.send(composition)
            }
            else
                res.sendStatus(404);
        }
        catch (err) {
            console.error(err.message);
        }
    },

    postComposition(req, res) {
        if (req.body.title != null && req.body.title != "") {
            const newComposition = compositionRepository.addComposition(req.body);
            res.status(201).send(newComposition);
        }
        else {
            res.sendStatus(400);
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
            console.log(composition);
            if (composition.id != null) {
                if (req.body.title != null && req.body.title === "") {
                    res.sendStatus(400);
                }
                else {
                    res.send(compositionRepository.updateComposition(composition));
                }
            }
            else {
                res.sendStatus(400);
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    }
}