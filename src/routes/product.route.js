const { Router } = require('express');
const router = Router();

//Middleware
const auth = require('../middleware/auth');
const checkAttr = require('../middleware/checkAttr');
const validateIdMongo = require('../middleware/validateIdMongo');

//Controlador de productos
const {
    getProducts,
    getProductById,
    postProduct,
    patchProduct,
    deleteProduct
} = require('../controllers/products.controller');

//PRODUCTOS
//Disponible para usuarios y admin
//GET productos
router.get('/productos', getProducts);

//GET productos/id
router.get('/productos/:id', validateIdMongo, getProductById);

//Disponible solo para admin
//POST productos
router.post('/productos', [auth, checkAttr], postProduct);

//PATCH productos/id
router.patch('/productos/:id', [auth, validateIdMongo], patchProduct);

//DELETE productos/id
router.delete('/productos/:id', [auth, validateIdMongo], deleteProduct);

module.exports = router;