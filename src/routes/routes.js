const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth');

const {
    checkIfWrongAttr,
    checkIfMissingAttr
} = require('../middleware/checkAttr');

const {
    getRoot,
    setError
} = require('../controllers/index.controller');

const {
    getProducts,
    getProductById,
    postProduct,
    patchProduct,
    deleteProduct
} = require('../controllers/products.controller');

const {
    getCart,
    getCartProduct,
    postCartProduct,
    deleteCart,
    deleteCartProduct
} = require('../controllers/cart.controller');

router.get('/', getRoot);

//PRODUCTOS
//disponible para usuarios y admin
//GET productos
router.get('/productos', getProducts);

//GET productos/id
router.get('/productos/:id', getProductById);

//disponible solo para admin
//POST productos
router.post('/productos', [auth, checkIfMissingAttr, checkIfWrongAttr], postProduct);

//PATCH productos/id
router.patch('/productos/:id', [auth, checkIfWrongAttr], patchProduct);

//DELETE productos/id
router.delete('/productos/:id', auth, deleteProduct);

//CARRITO
//disponible para usuarios y admin
//GET carrito
router.get('/carrito', getCart);

//GET carrito/id
router.get('/carrito/:id', getCartProduct);

//POST carrito
router.post('/carrito/:id', postCartProduct);

//PUT carrito/id
router.delete('/carrito/:id', deleteCartProduct)

//DELETE carrito
router.delete('/carrito', deleteCart);

//Path/page not found
router.get('*', setError);

module.exports = router;