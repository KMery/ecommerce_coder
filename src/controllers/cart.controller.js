const Product = require('../models/product.model')
// const Cart = require('../models/cart.model');

const {
    msg_err_server,
    msg_err_notFound,
    msg_err_notBody
} = require('./errorMessages');
const CartService = require('../services/cart.service');
const ItemService = require('../services/item.service');

//Obtiene todos los carritos
const getCarts = async (req, res, next) => {
    try {
        const cart = new CartService();
        const result = await cart.getCarts();
        if (!result) {
            return res.status(404).send(msg_err_notFound);
        }
        res.send(result);
    } catch (error) {
        res.status(500).send(msg_err_server)
    }

};

const getCartById = async (req, res, next) => {
    try {
        const cart = new CartService();
        const result = await cart.getCartById(req.params.id);
        if (!result) {
            return res.status(404).send(msg_err_notFound);
        }
        res.send(result);
    } catch (error) {
        res.status(500).send(msg_err_server)
    }
}

//Crea un carrito con el producto pasado en caso de existir en db
const postCartProduct = async (req, res, next) => {
    try {
        const product = new ItemService();
        const prod_result = await product.getItemById(req.body.product);
        if (!prod_result) {
            return res.status(404).send({message: "Producto no existe"});
        }
        const new_product = new Product(prod_result.id, prod_result.title, prod_result.price, prod_result.thumbnail, prod_result.stock, prod_result.description, prod_result.itemCode)
        // console.log('productPostInCart', new_product);
        const cart = new CartService();
        await cart.createCart(new_product);
        res.send({message: `Producto ${prod_result.title} agregado al carrito`});
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

//Agrega cantidad de un producto en caso de que este ya exista en carrito o agrega un nuevo articulo si no se encuentra en carrito
const addProductToCart = async (req, res, next) => {
    try {
        const cart = new CartService()
        const cart_result = await cart.getCartById(req.params.id)
        if (!cart_result) {
            return res.status(404).send({message: "Carrito no existe"});
        }
        const product = new ItemService();
        const prod_result = await product.getItemById(req.body.product);
        if (!prod_result) {
            return res.status(404).send({message: "Producto no existe"});
        }
        const product_in_cart = cart_result.product.find(prod => {
            if (prod.id == req.body.product) {
                prod.quantity++
                return true
            }
        });
        // console.log('product_in_cart', product_in_cart);
        if (!product_in_cart) {
            const new_product = new Product(prod_result.id, prod_result.title, prod_result.price, prod_result.thumbnail, prod_result.stock, prod_result.description, prod_result.itemCode)
            cart_result.product.push(new_product);
        }
        // console.log('cart_result.product', cart_result.product);
        await cart.updateCart(req.params.id, cart_result);
        res.send({message: `Producto "${prod_result.title}" agregado al carrito`});
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
}

//Borra un producto del carrito, si este tiene en cantidad mas de uno le saca la cantidad de a uno, en caso de que solo exista uno lo borra
const deleteCartProduct = async (req, res, next) => {
    try {
        const cart = new CartService();
        const cart_result = await cart.getCartById(req.params.id);
        if (!cart_result) {
            return res.status(404).send({message: "Carrito no existe"});
        }
        if (req.params.product.match(/^[0-9a-fA-F]{24}$/)) {
            const product = new ItemService();
            const prod_result = await product.getItemById(req.params.product);
            if (!prod_result) {
                return res.status(404).send({message: "Producto no existe"});
            }
            cart_result.product.find(prod => {
                if (prod.id == req.params.product) {
                    prod.quantity--;
                }
            });
            await cart.updateCart(req.params.id, cart_result)
            res.send({message: `Producto "${prod_result.title}" borrado del carrito con éxito`})
        } else {
            return res.status(404).send({message: "Id de producto en formato incorrecto"})
        }

    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

//Borra el carrito por completo con el id pasado
const deleteCart = async (req, res, next) => {
    try {
        const cart = new CartService()
        const result = await cart.deleteCart(req.params.id)
        if (!result) {
            return res.status(404).send(msg_err_notFound);
        }
        res.send({message: `Carrito de id ${req.params.id} eliminado`})
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

module.exports = {
    getCarts,
    getCartById,
    addProductToCart,
    postCartProduct,
    deleteCart,
    deleteCartProduct
}