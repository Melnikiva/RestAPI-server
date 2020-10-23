const JsonStorage = require('../jsonStorage');

class CompositionRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    addComposition(compositionModel) {
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
        for (let i = 0; i <= compositions.length; i++) {
            if (compositions[i].id === compositionModel.id) {
                compositions[i] = compositionModel;
                this.storage.writeItems(compositions);
                break;
            }
        }
    }

    deleteComposition(compositionId) {
        const compositions = this.storage.readItems();
        const res = compositions.filter(composition => composition.id !== compositionId);
        this.storage.writeItems(res);
    }
};

module.exports = CompositionRepository;
