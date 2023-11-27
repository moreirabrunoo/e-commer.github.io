const profileModel = require("../models/profileModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE SUPER ULTRA SECRETA YEAH";
/* Función Login / Verifica los datos entrantes, los compara con la base de datos y 
envía un Token con los datos completos del usuario */
const Login = async (req, res) => {
    let userdata; // Almacenará los datos del usuario
    const UserList = await profileModel.getUserList(); // Trae todos los usuarios de la base de datos
    const { email, password } = req.body;
    let matchingcredentials = false;
    for (let i = 0; i < UserList.length; i++) {
        if (UserList[i].email === email && UserList[i].password === password) {
            matchingcredentials = true; // Confirma las credenciales
            userdata = { 
                id: UserList[i].id,
                username: UserList[i].username,
                fullname: UserList[i].fullname,
                email: UserList[i].email
            };
        }
    }
    if (matchingcredentials) {
        const token = jwt.sign({ email }, SECRET_KEY); // Firmamos el username
        const datos = { // Preparamos la respuesta del servidor
            token, 
            userdata
        }
        res.status(200).json({ datos }); // Enviamos...
    } else {
        res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
    }
}
// Se crea un nuevo usuario / Función SIGN UP
const newUser = async (req, res) => {
    const newUser = await profileModel.newUser(req.body);
    if (newUser) {
        res.json(newUser);
    } else {
        res.status(500).json({ message: "El servidor no está funcionando" });
    }
}

// Se modifican los datos de un usuario
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const updateUser = await profileModel.getUser(id); // Buscamos al usuario en la base de datos
    if (updateUser) {
        const updatedUser = await profileModel.updateUser(req.body, id) // Si existe, hacemos el UPDATE
        if (updatedUser) {
            res.json(updatedUser); // Si la respuesta fue positiva, se envia
        } else {
            res.status(500).json({ message: "El servidor no está funcionando" });
        }
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}
// Exportamos...
module.exports = {
    Login,
    newUser,
    updateUser
}