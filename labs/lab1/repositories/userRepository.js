const JsonStorage = require('../jsonStorage');

class UserRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    addUser(userModel) {
        let users = this.storage.readItems();
        users.push(userModel);
        this.storage.writeItems(users);
        this.storage.incrementNextId();
    }

    getUsers() {
        return this.storage.readItems();
    }

    getUserById(id) {
        const items = this.getUsers();
        for (const item of items) {
            if (item.id === id) {
                return item;
            }
        }
        return null;
    }

    updateUser(userModel) {
        let users = this.storage.readItems();
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userModel.id) {
                users[i] = userModel;
                this.storage.writeItems(users);
                break;
            }
        }
    }

    deleteUser(userId) {
        const users = this.storage.readItems();
        const res = users.filter(user => user.id !== userId);
        this.storage.writeItems(res);
    }
};

module.exports = UserRepository;
