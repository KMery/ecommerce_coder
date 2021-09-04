const { Router } = require('express');
const router = Router();

//Middleware
const auth = require('../middleware/auth');
const checkAttr = require('../middleware/checkAttr');
const validateIdMongo = require('../middleware/validateIdMongo');

//Controlador de carrito
const {
    getCarts,
    getCartById,
    postCartProduct,
    deleteCart,
    deleteCartProduct,
    addProductToCart
} = require('../controllers/cart.controller');

//CARRITO
//Admin
//GET carrito --> Obtiene todos los carritos
router.get('/carrito', auth, getCarts);

//Disponible para usuarios y admin
//TODO: Por ahora cualquiera puede buscar cualquier id de carrito, se debe crear una función que solo si el carrito le pertenece a la persona lo pueda ver

//GET carrito/id
router.get('/carrito/:id', validateIdMongo, getCartById);

//POST carrito
router.post('/carrito', checkAttr, postCartProduct);

//PUT carrito/id --> Dado un id de carrito se pueden agregar más cantidad a un producto o cargar uno nuevo
router.put('/carrito/modifica/:id', validateIdMongo, addProductToCart)

//DELETE carrito --> Borra el carrito con el id pasado
router.delete('/carrito/:id', validateIdMongo, deleteCart);

//DELETE carrito product --> Para un id de carrito pasado borra el id de producto pasado
router.delete('/carrito/modifica/:id&:product', validateIdMongo, deleteCartProduct);

module.exports = router;