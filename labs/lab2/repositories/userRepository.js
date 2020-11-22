const JsonStorage = require('../jsonStorage');

class UserRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    addUser(userModel) {
        userModel.id = this.storage.nextId;
        userModel.registeredAt = new Date().toISOString();
        let users = this.storage.readItems();
        users.push(userModel);
        this.storage.writeItems(users);
        this.storage.incrementNextId();
        return userModel;
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
                userModel.login     != null ? users[i].login = userModel.login : {};
                userModel.fullname  != null ? users[i].fullname = userModel.fullname : {};
                userModel.role      != null ? users[i].role = userModel.role : {};
                userModel.avaUrl    != null ? users[i].avaUrl = userModel.avaUrl : {};
                userModel.isEnabled != null ? users[i].isEnabled = userModel.isEnabled : {};
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
