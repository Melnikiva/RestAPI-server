const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository('/home/melnik/webprogbase/labs/lab2/data/users.json')


module.exports = {
    getUsers(req, res) {
        res.send(userRepository.getUsers());
    },

    getUserById(req, res) {
        const user = userRepository.getUserById(parseInt(req.params.id));
        if (user !== null)
            res.send(user)
        else
            res.sendStatus(404);
    },

    postUser(req, res) {
        try {
            const newUser = userRepository.addUser(req.body);
            res.send(newUser);
            res.sendStatus(201);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    },

    deleteUserById(req, res) {
        try {
            const deleted = compositionRepository.deleteComposition(parseInt(req.params.id));
            deleted != null ? res.send(deleted) : res.sendStatus(404);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    },

    putUser(req, res) {
        try {
            const composition = req.body;
            res.send(compositionRepository.updateComposition(composition));
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    }
}