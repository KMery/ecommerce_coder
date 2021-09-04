const ItemService = require('../services/item.service');

//Búsquedas:
// nombre (coincidencia exacta)
const getNameProduct = async (search) => {
    try {
        const item = new ItemService();
        return await item.getItemByName(search);
    } catch (error) {
        return error;
    }
}
// código (coincidencia exacta)
const getItemCode = async (search) => {
    try {
        const item = new ItemService();
        return await item.getItemByItemCode(search);
    } catch (error) {
        return error;
    }
}

// precio (rango)
const getPriceRange = async (searchMin, searchMax) => {
    try {
        const item = new ItemService();
        return await item.getItemByPriceRange(searchMin, searchMax);
    } catch (error) {
        return error;
    }
}

// stock (rango)
const getStockRange = async (searchMin, searchMax) => {
    try {
        const item = new ItemService();
        return await item.getItemByStockRange(searchMin, searchMax);
    } catch (error) {
        return error;
    }
}

//De acuerdo a la búsqueda seleccionada llama a la función que trae los datos solicitados
const selectSearch = async (typeSearch, search, min, max) => {
    switch (typeSearch) {
        case "nombre":
            return await getNameProduct(search);
        case "codigo":
            return await getItemCode(search);
        case "precio":
            return await getPriceRange(min, max);
        case "stock":
            return await getStockRange(min, max);    
        default:
            return {message: `No se han encontrado resultados para la búsqueda "${search}"`};
    }
}

const searchAllowed = ['nombre', 'codigo', 'precio', 'stock'];

const getSearch = async (req, res, next) => {
    try {
        const typeSearch = req.originalUrl.split('/')[2].split('=')[0];
        if (!typeSearch || searchAllowed.includes(typeSearch) === false) {
            return res.status(400).send({message: "Búsqueda no válida"});
        }
        const { search, min, max } = req.params;
        const result = await selectSearch(typeSearch, search, min, max);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: 'Error en servidor' });
    }
}

module.exports = getSearch;