let mariadb = require("mariadb");

let pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
    connectionLimit: 5
});
// Seleccionamos todos los artículos del carrito
const getCartList = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, name, quantity, cost, currency, imgsource FROM cartlist;"
        );
        return rows;

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}
// Método para seleccionar un solo artículo en el carrito, se utiliza en los controladores
const getCartItem = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, name, quantity, cost, currency, imgsource FROM cartlist WHERE id=?;",[id]
        );
        return rows;

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}
// Agregamos un artículo a la base de datos del carrito
const newCartItem = async (request) => {
    const { id, name, quantity, cost, currency, imgsource} = request;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `INSERT INTO cartlist (id, name, quantity, cost, currency, imgsource) VALUES (?,?,?,?,?,?);`, [id, name, quantity, cost, currency, imgsource]

        );
        return { id, name, quantity, cost, currency, imgsource }; 

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}
// Modificamos la cantidad de un mismo artículo en la base de datos
const setQuantity = async (quantity, id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `UPDATE cartlist SET quantity=? WHERE id=?`, [quantity, id]

        );
        return { quantity };

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
}
// Borramos un artículo de la base de datos
const deleteCartItem = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            `DELETE FROM cartlist WHERE id=?`, [id]

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
    getCartList,
    getCartItem,
    newCartItem,
    setQuantity,
    deleteCartItem
}
