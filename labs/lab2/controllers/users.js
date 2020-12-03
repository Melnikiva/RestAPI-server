const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository('./data/users.json')


module.exports = {
    getUsers(req, res) {
        try {
            res.send(userRepository.getUsers());
        }
        catch (err) {
            console.error(err.message);
        }
    },

    getUserById(req, res) {
        try {
            const user = userRepository.getUserById(parseInt(req.params.id));
            if (user !== null) {
                res.send(user)
            }
            else
                res.sendStatus(404);
        } catch (err) {
            console.error(err.message);
        }
    },

    postUser(req, res) {
        if (req.body.login != null && req.body.login != "") {
            const newUser = userRepository.addUser(req.body);
            res.status(201).send(newUser);
        }
        else {
            res.sendStatus(400);
        }
    },

    deleteUserById(req, res) {
        try {
            const deleted = userRepository.deleteUser(parseInt(req.params.id));
            deleted != null ? res.send(deleted) : res.sendStatus(404);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    },

    putUser(req, res) {
        try {
            const user = req.body;
            if (req.body.id != null) {
                if (req.body.login != null && req.body.login === "") {
                    res.sendStatus(400);
                }
                else {
                    res.send(userRepository.updateUser(user));
                }
            }
            else {
                res.sendStatus(400);
            }
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    }
}