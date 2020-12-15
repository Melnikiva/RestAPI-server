const CompositionRepository = require('../../repositories/compositionRepository');
const compositionRepository = new CompositionRepository('./data/compositions.json')

const MediaRepository = require('../../repositories/mediaRepository');
const mediaRepository = new MediaRepository('./data/media');

module.exports = {
    renderCompositionsPage(req, res) {
        const str = req.query.title;
        let empty = true;
        let search_res = false;
        let compositions = compositionRepository.getCompositions();
        if (str != null && str != "") {
            compositions = compositions.filter(composition => {
                return composition.title.toLowerCase().includes(str.toLowerCase());
            });
        }
        if (compositions.length === 0) {
            empty = false;
        }

        if (empty && str != "" && typeof str !== 'undefined') {
            search_res = true;
        }

        const obj = arrayToObject(compositions);
        obj.search = str;
        obj.empty = empty;
        obj.search_res = search_res;
        res.render('compositions', obj);
    },
    renderCompositionPage(req, res) {
        let composition = compositionRepository.getCompositionById(parseInt(req.params.id));
        res.render('composition', composition);
    },
    renderNew(req, res) {
        res.render('newcomposition');
    },
    postComposition(req, res) {
        let newComposition = req.body;
        newComposition.imageId = mediaRepository.storage.currentId - 1;
        console.log(newComposition);
        let composition = compositionRepository.addComposition(newComposition);
        console.log(composition);

        res.redirect(`/compositions/${composition.id}`);
    },
    deleteComposition(req, res) {
        const deleted = compositionRepository.deleteComposition(parseInt(req.params.id));
        deleted != null ? res.redirect(`/compositions`) : res.sendStatus(404);
    }
}

function arrayToObject(objectArray) {
    var object = {};

    objectArray = createTitleLinks(objectArray);
    object.compositions = objectArray;

    return object;
}

function createTitleLinks(compositions) {
    for (let i = 0; i < compositions.length; i++) {
        compositions[i].title = '<a href="/compositions/' + compositions[i].id + '">' + compositions[i].title + '</a>';
    }
    return compositions;
}