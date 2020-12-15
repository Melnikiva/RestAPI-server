const UserRepository = require('../../repositories/userRepository');
const userRepository = new UserRepository('./data/users.json')

module.exports = {
    renderUsersPage(req, res) {
        res.render('users', arrayToObject(userRepository.getUsers()));
    },

    renderUserPage(req, res) {
        let user = userRepository.getUserById(parseInt(req.params.id));
        user.registeredAt = getNormalDate(user.registeredAt);
        if (user.avaUrl == "") {
            user.avaUrl = "/images/not_found.png";
        }
        res.render('user', user);
    }
}

function arrayToObject(objectArray) {
    var object = {};
    for (let i = 0; i < objectArray.length; i++) {
        objectArray[i].registeredAt = getNormalDate(objectArray[i].registeredAt);
    }
    objectArray = createLoginLinks(objectArray);
    object.users = objectArray;

    return object;
}

function getNormalDate(some_date) {
    let date = new Date(some_date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hrs = date.getHours();
    let mnts = date.getMinutes();
    let scnds = date.getSeconds();

    if (dt < 10) { dt = '0' + dt; }
    if (month < 10) { month = '0' + month; }
    if (hrs < 10) { hrs = '0' + hrs; }
    if (mnts < 10) { mnts = '0' + mnts; }
    if (scnds < 10) { scnds = '0' + scnds; }

    some_date = year + '-' + month + '-' + dt + ' | ' + hrs + ':' + mnts + ':' + scnds;
    return some_date;
}

function createLoginLinks(users) {
    for (let i = 0; i < users.length; i++) {
        users[i].login = '<a href="/users/' + users[i].id + '">' + users[i].login + '</a>';
    }
    return users;
}