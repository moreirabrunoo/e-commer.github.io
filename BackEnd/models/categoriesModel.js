// Traemos los JSON almacenados para enviarlos
const getCategories = () => {
    const categories = require("../json/cat.json")
    return categories;
}

const getCategory = (id) => {
    const category = require(`../json/${id}.json`)
    return category;
}

const getProduct = (id) => {
    const product = require(`../json/products/${id}.json`);
    return product;
}

const getComments = (id) => {
    const comments = require(`../json/comments/${id}.json`)
    return comments;
}
// Traemos los JSON almacenados para enviarlos
// Exportamos...
module.exports = {
    getCategories,
    getCategory,
    getProduct,
    getComments
}