let mariadb = require("mariadb");

let pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
    connectionLimit: 5
});
// Trae todas las Rows de los Usuarios registrados
const getUserList = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, username, fullname, email, password FROM logincredentials;"
        );
        return rows;

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}
// Método para seleccionar un solo usuario, se utiliza en métodos dentro del controller
const getUser = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, username, fullname, email, password FROM logincredentials WHERE id=?;",[id]
        );
        return rows;

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}
// Crear un nuevo usuario
const newUser = async (request) => {
    const {username, fullname, email, password } = request;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `INSERT INTO logincredentials (username, fullname, email, password) VALUES (?,?,?,?);`, [username, fullname, email, password]
        );
        return true;

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}
// Método Put, para modificar los datos de un usuario
const updateUser = async (request, id) => {
    const { username, fullname, email } = request
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `UPDATE logincredentials SET username=?, fullname=?, email=? WHERE id=?`, [username, fullname, email, id]
        );
        return true;

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}
// Exportamos...
module.exports = {
    getUserList,
    getUser,
    newUser,
    updateUser
}