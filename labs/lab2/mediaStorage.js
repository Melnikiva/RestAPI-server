const multer = require('multer');
const fs = require('fs');

class MediaStorage {
    constructor(folderPath, currentIdPath) {
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, folderPath);
            },
            filename: (req, file, cb) => {
                cb(null, this.currentId + '.png');
                this.incrementId();
            }
        });
        this.upload = multer({ storage: this.storage });
        this.currentIdPath = currentIdPath;
    }

    uploadFile(fileKey) {
        return this.upload.single(fileKey);
    }

    incrementId() {
        let current = JSON.parse(fs.readFileSync(this.currentIdPath));
        current.currentId++;
        const jsonText = JSON.stringify(current, null, 4);
        fs.writeFileSync(this.currentIdPath, jsonText);
    }

    get currentId() {
        const next = JSON.parse(fs.readFileSync(this.currentIdPath)).currentId;
        return String(next);
    }
}

module.exports = MediaStorage;