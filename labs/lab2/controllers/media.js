const MEDIA_PATH = './data/media';

const MediaRepository = require('../repositories/mediaRepository');
const mediaRepository = new MediaRepository(MEDIA_PATH);
const fs = require('fs');

module.exports = {
    uploadSingle(fileKey) {
        return mediaRepository.uploadMedia(fileKey);
    },

    uploadMedia(req, res) {
        res.json({ mediaId: mediaRepository.storage.currentId - 1 });
    },

    downloadMediaById(req, res) {
        const path = MEDIA_PATH + '/'
                                + String(req.params.id)
                                + '.png';
        console.log(path);
        if (fs.existsSync(path)) {
            res.download(path);
        }
        else {
            res.sendStatus(404);
        }
    }
}