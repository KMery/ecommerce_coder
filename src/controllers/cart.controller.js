const Cart = require('../models/cart.model');
const path = require('path');
const arch_cart = path.join(__dirname, '../../public/cart.txt');
const arch_products = path.join(__dirname, '../../public/products.txt');
const {
    readArch,
    saveList
} = require('../utils/utils');
const msg_err_server = { message: 'Error en servidor' };

const getCart = async (req, res, next) => {
    const cart = await readArch(arch_cart);
    res.send({cart: cart});
};

const getCartProduct = async (req, res, next) => {
    try {
        const cart = await readArch(arch_cart);
        const item = cart.find(item => item.id === req.params.id);
        if (!item) {
            return res.status(404).send({message: 'Item en carrito no encontrado'});
        }
        res.send({item: item});
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

const postCartProduct = async (req, res, next) => {
    try {
        const cart_saved = await readArch(arch_cart);
        let new_cart = [...cart_saved];
        const products = await readArch(arch_products);
        const product = products.find(product => product.id === req.params.id);
        if (!product) {
            return res.status(404).send({message: 'Producto no existe'});
        }
        const cart = new Cart(product);
        cart.setId(new Date().getTime().toString()) //temporal
        cart.setTimestamp();
        new_cart.push(cart);
        saveList(arch_cart, new_cart);
        res.send({message: 'Nuevo producto agregado a carrito'});
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

const deleteCartProduct = async (req, res, next) => {
    try {
        const cart_saved = await readArch(arch_cart);
        if (cart_saved.length === 0) {
            return res.status(400).send({message: 'No existe producto a borrar en carrito'});
        }
        const new_cart = cart_saved.filter(item => item.id !== req.params.id);
        await saveList(arch_cart, new_cart);
        res.send({message: `Producto id ${req.params.id} borrado`});
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

const deleteCart = async (req, res, next) => {
    try {
        await saveList(arch_cart, []);
        res.send({message: 'El carrito se ha vaciado'});
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

module.exports = {
    getCart,
    getCartProduct,
    postCartProduct,
    deleteCart,
    deleteCartProduct
}