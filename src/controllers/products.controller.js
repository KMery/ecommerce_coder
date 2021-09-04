const {
    msg_err_server,
    msg_err_notFound,
    msg_err_notBody
} = require('./errorMessages');
const ItemService = require('../services/item.service')

const getProducts = async (req, res, next) => {
    try {
        const items = new ItemService();
        const result = await items.getItems();
        if (!result) {
            return res.status(404).send(msg_err_notFound);
        }
        res.send(result);
    } catch (error) {
        res.status(500).send(msg_err_server)
    }
};

const getProductById = async (req, res, next) => {
    try {
        const item = new ItemService();
        const result = await item.getItemById(req.params.id);
        if (!result) {
            return res.status(404).send(msg_err_notFound);
        }
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(msg_err_server);
    }
};

const postProduct = async (req, res, next) => {
    try {
        const item = new ItemService();
        const result = await item.createItem(req.body);
        res.send(result)
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
}

const patchProduct = async (req, res, next) => {
    try {
        const item = new ItemService();
        const product = await item.getItemById(req.params.id);
        if (!product) {
            return res.status(404).send(msg_err_notFound);
        };
        Object.keys(req.body).forEach(attr => {
            product[attr] = req.body[attr];
        });
        item.updateItem(req.params.id, product);
        res.send(product);
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const item = new ItemService();
        const result = await item.deleteItem(req.params.id);
        if (!result) {
            return res.status(404).send(msg_err_notFound);
        }
        res.send({message: `Producto de id ${result.id} eliminado`})
    } catch (error) { 
        res.status(500).send(msg_err_server);
    }
};

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    patchProduct,
    deleteProduct,
}