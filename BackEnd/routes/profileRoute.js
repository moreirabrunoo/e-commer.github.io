const express = require("express");

const profileRouter = express.Router();

const profileController = require("../controllers/profileController");

// Login
profileRouter.post ("/login", profileController.Login);
// SignUp
profileRouter.post ("/signup", profileController.newUser);
// Edit MyProfile
profileRouter.put ("/:id", profileController.updateUser);

module.exports = profileRouter;