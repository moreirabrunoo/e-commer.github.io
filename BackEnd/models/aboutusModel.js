// Traemos el JSON de About-us
const getAboutUs = () => {
    const aboutus = require("../json/about-us.json");
    return aboutus;
}
// Exportamos...
module.exports = {
    getAboutUs
}