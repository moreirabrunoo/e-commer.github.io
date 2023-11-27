let express = require("express");
// JsonWebToken & Secret Key
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE SUPER ULTRA SECRETA YEAH";
// Librerias externas
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();
let port = 3000;
// Librerias externas
// Instancias de librerias externas
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Instancias de librerias externas
// Traigo los Routers
const categoriesRouter = require("./routes/categoriesRoute");
const cartlistRouter = require("./routes/cartlistRoute");
const profileRouter = require("./routes/profileRoute");
const aboutusRouter = require("./routes/aboutusRoute");

// DECODE PARA UTILIZAR EL CARRITO
app.use("/cartlist", (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
        console.log(decoded);
        next();
    } catch (err) {
        console.error("Error al verificar el token:", err);
        res.status(401).json({ message: "Usuario no autorizado" });
    }
    
});

// ROUTERS
app.use("/categories", categoriesRouter);
app.use("/cartlist", cartlistRouter); 
app.use("/profile", profileRouter); 
app.use("/aboutus", aboutusRouter); 

// Puerto escucha
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});