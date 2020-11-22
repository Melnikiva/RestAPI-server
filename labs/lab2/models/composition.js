/**
 * @typedef User
 * @property {integer} id
 * @property {string}  title.required - composition title
 * @property {string}  genre - music genre
 * @property {integer} rating - composition rating
 */

class Composition {

    constructor(id, title, genre, rating) {
        this.id = id;           // number
        this.title = title;     // string
        this.genre = genre;     // string
        this.rating = rating;   // number
    }
}

module.exports = Composition;