const express = require("express");
const categoriesRouter = express.Router();

const categoriesController = require("../controllers/categoriesController");

// Categories.html
categoriesRouter.get("/", categoriesController.getCategories);
// Products.html
categoriesRouter.get("/:id", categoriesController.getCategory);
// Product-info.html - Product
categoriesRouter.get("/products/:id", categoriesController.getProduct);
// Product-info.html - Comments
categoriesRouter.get("/comments/:id", categoriesController.getComments);

module.exports = categoriesRouter;