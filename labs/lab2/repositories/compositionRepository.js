const JsonStorage = require('../jsonStorage');

class CompositionRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    addComposition(compositionModel) {
        compositionModel.id = this.storage.nextId;
        let compositions = this.storage.readItems();
        compositions.push(compositionModel);
        this.storage.writeItems(compositions);
        this.storage.incrementNextId();
    }

    getCompositions() {
        return this.storage.readItems();
    }

    getCompositionById(id) {
        const items = this.getCompositions();
        for (const item of items) {
            if (item.id === id) {
                return item;
            }
        }
        return null;
    }

    updateComposition(compositionModel) {
        let compositions = this.storage.readItems();
        let id = -1;
        for (let i = 0; i <= compositions.length; i++) {
            if (compositions[i].id === compositionModel.id) {
                id = i;
                compositionModel.title != null ? compositions[i].title = compositionModel.title : {};
                compositionModel.genre != null ? compositions[i].genre = compositionModel.genre : {};
                compositionModel.rating != null ? compositions[i].rating = compositionModel.rating : {};
                this.storage.writeItems(compositions);
                break;
            }
        }
        return (id != -1 ? compositions[id] : null);
    }

    deleteComposition(compositionId) {
        const compositions = this.storage.readItems();
        let res = [];
        let deleted = null;
        for (let i = 0; i < compositions.length; i++) {
            if (compositions[i].id !== compositionId)
                res.push(compositions[i])
            else
                deleted = compositions[i];
        }
        this.storage.writeItems(res);

        return deleted;
    }
};

module.exports = CompositionRepository;
