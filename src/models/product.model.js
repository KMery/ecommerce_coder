//id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
class Product {
    constructor (id, title, price, thumbnail, stock = 0, description = "", itemCode, quantity = 1) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.description = description;
        this.itemCode = itemCode;
        this.stock = stock;
        this.quantity = quantity;
    }
}

module.exports = Product;