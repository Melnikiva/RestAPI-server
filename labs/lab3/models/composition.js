/**
 * @typedef Composition
 * @property {integer} id
 * @property {string}  title.required   - composition title
 * @property {string}  genre            - music genre
 * @property {integer} rating           - composition rating
 * @property {unteger}  imageId         - composition image id
 */

class Composition {

    constructor(id, title, genre = "", rating = 0, imageId = 0) {
        this.id = id;               // number
        this.title = title;         // string
        this.genre = genre;         // string
        this.rating = rating;       // number
        this.imageId = imageId;     // number
    }
}

module.exports = Composition;