const JsonStorage = require('../jsonStorage');
const User = require('../models/user');

class UserRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    addUser(userModel) {
        userModel.id = this.storage.nextId;
        userModel.registeredAt = new Date().toISOString();
        const newUser = new User(
            userModel.id,
            userModel.login,
            userModel.fullname,
            userModel.role,
            userModel.registeredAt,
            userModel.avaUrl,
            userModel.isEnabled,
            userModel.bio);
        let users = this.storage.readItems();
        users.push(newUser);
        this.storage.writeItems(users);
        this.storage.incrementNextId();
        return newUser;
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
        console.log(userModel);
        let users = this.storage.readItems();
        let id = -1;
        const userId = parseInt(userModel.id);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                id = i;
                userModel.login != null ? users[i].login = userModel.login : {};
                userModel.fullname != null ? users[i].fullname = userModel.fullname : {};
                userModel.role != null ? users[i].role = userModel.role : {};
                userModel.avaUrl != null ? users[i].avaUrl = userModel.avaUrl : {};
                userModel.isEnabled != null ? users[i].isEnabled = userModel.isEnabled : {};
                userModel.bio != null ? users[i].bio = userModel.bio : {};
                this.storage.writeItems(users);
                break;
            }
        }
        return (id != -1 ? users[id] : null);
    }

    deleteUser(userId) {
        const users = this.storage.readItems();
        let res = [];
        let deleted = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id !== userId)
                res.push(users[i])
            else
                deleted = users[i];
        }
        this.storage.writeItems(res);

        return deleted;
    }
};

module.exports = UserRepository;
