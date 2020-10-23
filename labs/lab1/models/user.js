class User {

    constructor(id, login, fullname, role, registeredAt, avaUrl, isEnabled) {
        this.id = id;  // number
        this.login = login;  // string
        this.fullname = fullname;  // string
        this.role = role;  // number
        this.registeredAt = registeredAt;   // date
        this.avaUrl = avaUrl;   // string
        this.isEnabled = isEnabled;   // bool
    }
 };
 
 module.exports = User;
 