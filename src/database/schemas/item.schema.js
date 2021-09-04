//id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
const itemSchema = {
    title: String,
    price: Number,
    thumbnail: String,
    description: String,
    itemCode: String,
    stock: Number
};

module.exports = itemSchema;