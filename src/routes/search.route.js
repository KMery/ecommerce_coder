const { Router } = require('express');
const router = Router();

//Controlador de busquedas
const getSearch = require('../controllers/search.controller');

//BUSQUEDAS por parametro
//disponible para todos
//GET search por title/nombre del producto --> Debe ser coincidencia exacta
router.get('/busqueda/nombre=:search', getSearch);

//GET search por itemCode/codigo del producto --> Debe ser coincidencia exacta
router.get('/busqueda/codigo=:search', getSearch);

//GET search por price del producto --> Es por rango
router.get('/busqueda/precio/:min&:max', getSearch);

//GET search por stock del producto --> Es por rango
router.get('/busqueda/stock/:min&:max', getSearch);

module.exports = router;