const { Router } = require('express');
const router = Router();

//Controlador Base
const {
    getRoot,
    setError
} = require('../controllers/index.controller');

//Default route
router.get('/', getRoot);

//Path/page not found
router.get('*', setError);

module.exports = router;