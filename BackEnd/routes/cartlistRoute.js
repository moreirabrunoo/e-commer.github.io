const express = require("express");

const cartlistRouter = express.Router();

const cartlistController = require("../controllers/cartlistController");

// Mostrar lista de Carrito (Todos los artículos)
cartlistRouter.get("/", cartlistController.getCartList)
// Agregar artículo al carrito
cartlistRouter.post("/", cartlistController.newCartItem)
// Modificar la cantidad de artículos
cartlistRouter.put("/:id", cartlistController.setQuantity)
// Eliminar un artículo del carrito
cartlistRouter.delete("/:id", cartlistController.deleteCartItem)

module.exports = cartlistRouter;





