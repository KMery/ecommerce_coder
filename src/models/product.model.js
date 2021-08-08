//id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
class Product {
    constructor (nombre, descripcion, codigo, foto, precio, stock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }

    setId(id) {
        this.id = id;
    }

    setTimeStamp() {
        this.timestamp = Date.now();
    }
}

module.exports = Product;