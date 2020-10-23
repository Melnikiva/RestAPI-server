const fs = require('fs');
const chalk = require('chalk');  // кольоровий текст в консолі

class JsonStorage {
    // filePath - path to JSON file
    constructor(filePath) {
        if (filePath !== "")
            this.filePath = filePath;
        else
            throw new Error("Not implemented.");
    }

    get nextId() {
        const next = JSON.parse(fs.readFileSync(this.filePath)).nextId;
        return next;
    }

    incrementNextId() {
        let items = JSON.parse(fs.readFileSync(this.filePath));
        items.nextId++;
        const jsonText = JSON.stringify(items, null, 4);
        fs.writeFileSync(this.filePath, jsonText);
    }

    readItems() {
        const jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText).items;
        return jsonArray;
    }

    writeItems(items) {
        const jsonText = JSON.stringify({
            nextId: this.nextId,
            items
        }, null, 4);
        fs.writeFileSync(this.filePath, jsonText);
        console.log(chalk.greenBright("File was succesfully updated"));
    }
};

module.exports = JsonStorage;