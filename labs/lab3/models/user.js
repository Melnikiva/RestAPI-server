/**
 * @typedef User
 * @property {integer} id
 * @property {string}  login.required   - unique username
 * @property {string}  fullname         - real name
 * @property {integer} role             - admin or user role
 * @property {date}    registeredAt     - registration time
 * @property {string}  avaUrl           - avatar url
 * @property {boolean} isEnabled        - user status
 * @property {string} bio               - user description
 */

class User {

    constructor(id, login, fullname = "", role = 0, registeredAt, avaUrl = "", isEnabled = true, bio = "") {
        this.id = id;                       // number
        this.login = login;                 // string
        this.fullname = fullname;           // string
        this.role = role;                   // number
        this.registeredAt = registeredAt;   // date
        this.avaUrl = avaUrl;               // string
        this.isEnabled = isEnabled;         // bool
        this.bio = bio;                     // string
    }
 };
 
 module.exports = User;
 