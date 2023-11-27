const express = require("express");
const aboutusRouter = express.Router();

const aboutusController = require("../controllers/aboutusController");

// About-us.html
aboutusRouter.get("/", aboutusController.getAboutUs);

module.exports = aboutusRouter;