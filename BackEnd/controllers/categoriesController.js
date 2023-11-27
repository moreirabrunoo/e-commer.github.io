const categoriesModel = require("../models/categoriesModel");

const getCategories = async (req, res) => {
    const categories = await categoriesModel.getCategories();
    res.json(categories);
}

const getCategory = async (req, res) => {
    const id = req.params.id;
    const category = await categoriesModel.getCategory(id);
    res.json(category);
}

const getProduct = async (req, res) => {
    const id = req.params.id;
    const product = await categoriesModel.getProduct(id);
    res.json(product);
}

const getComments = async (req, res) => {
    const id = req.params.id;
    const comments = await categoriesModel.getComments(id);
    res.json(comments);
}

module.exports = {
    getCategories,
    getCategory,
    getComments,
    getProduct
}