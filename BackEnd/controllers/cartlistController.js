const cartlistModel = require("../models/cartlistModel");

const getCartList = async (req, res) => {
    const CartList = await cartlistModel.getCartList();
    res.json(CartList);
}


const newCartItem = async (req, res) => {
    const CartItem = await cartlistModel.newCartItem(req.body);
    if (CartItem) {
        res.json(CartItem);
    } else {
        res.status(500).json({ message: "El servidor no está funcionando" });
    }
}

const setQuantity = async (req, res) => {
    const id = req.params.id;
    const quant = req.body.quantity;
    const SelectedItem = await cartlistModel.getCartItem(id);
    if (SelectedItem) {
        const Quantity = await cartlistModel.setQuantity(quant, id);

        if (Quantity) {
            res.json(Quantity);
        } else {
            res.status(500).json({ message: "El servidor no está funcionando" });
        }
    } else {
        res.status(404).json({ message: "Artículo no encontrado" });
    }


}

const deleteCartItem = async (req, res) => {
    const id = req.params.id;
    const SelectedItem = await cartlistModel.getCartItem(id);
    if (SelectedItem) {
        const DeletedItem = await cartlistModel.deleteCartItem(id);

        if (DeletedItem) {
            res.json(SelectedItem)
        } else {
            res.status(500).json({ message: "El servidor no está funcionando" });
        }
    } else {
        res.status(404).json({ message: "Entrenador no encontrado" });
    }
}

module.exports = {
    getCartList,
    newCartItem,
    setQuantity,
    deleteCartItem
}



