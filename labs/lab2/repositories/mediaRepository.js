const MediaStorage = require('../mediaStorage');

class MediaRepository {
    constructor(folderPath) {
        this.storage = new MediaStorage(folderPath, './data/mediaId.json');
    }

    uploadMedia(fileKey) {
        return this.storage.uploadFile(fileKey);
    }
}

module.exports = MediaRepository;