const Product = require('../models/product.model');
const path = require('path');
const arch_products = path.join(__dirname, '../../public/products.txt');
const {
    readArch,
    saveProduct,
    saveList
} = require('../utils/utils');
const msg_err_server = { message: 'Error en servidor' };

const getProducts = async (req, res, next) => {
    const products = await readArch(arch_products);
    res.send({products: products});
};

const getProductById = async (req, res, next) => {
    try {
        const products = await readArch(arch_products);
        const product = products.find(product => product.id === req.params.id);
        if (!product) {
            return res.status(404).send({message: 'Producto no encontrado'});
        };
        res.send({product: product});
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

const postProduct = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).send({message: 'No se encuentra producto a ser agregado'});
        };
        const new_product = new Product(...Object.values(req.body));
        new_product.setId(new Date().getTime().toString()); //temporal
        new_product.setTimeStamp();
        await saveProduct(arch_products, new_product);
        res.send({message: `producto '${new_product.nombre}' agregado`});
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
}

const patchProduct = async (req, res, next) => {
    try {
        const products = await readArch(arch_products);
        const product = products.find(product => product.id === req.params.id);
        if (!product) {
            return res.status(404).send({message: 'Producto no encontrado'});
        };
        //actualizar solo atributos pasados
        Object.keys(req.body).forEach(attr => {
            product[attr] = req.body[attr];
        });
        const new_products = products.filter(product => product.id !== req.params.id);
        new_products.push(product);
        await saveList(arch_products, new_products);
        res.send({message: `Producto id ${product.id} actualizado`});
    } catch (error) {
        res.status(500).send(msg_err_server);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const products = await readArch(arch_products);
        const new_products = products.filter(product => product.id !== req.params.id);
        if (new_products.length === products.length) {
            return res.status(404).send({message: 'El producto que intenta eliminar no existe'});
        };
        await saveList(arch_products, new_products);
        res.send({message: `Producto ${req.params.id} eliminado`});
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