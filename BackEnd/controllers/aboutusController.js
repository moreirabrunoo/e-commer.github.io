const aboutusModel = require("../models/aboutusModel");

const getAboutUs = async (req, res) => {
    const AboutUs = await aboutusModel.getAboutUs();
    res.json(AboutUs);
}

module.exports = {
    getAboutUs
}