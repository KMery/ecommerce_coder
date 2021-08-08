//id, timestamp(carrito), 
//producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
class Cart {
    constructor(product) {
        this.product = product;
    }

    setId(id) {
        this.id = id;
    }

    setTimestamp() {
        this.timestamp = Date.now();
    }
}

module.exports = Cart;