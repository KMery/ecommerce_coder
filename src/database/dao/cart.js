const { Cart } = require('../db')

module.exports = class CartDAO {
    async getCarts() {
        return await Cart
            .find({})
    }

    async getCartById(id) {
        return await Cart
            .findById(id)
            //.findById(id, {title:1, price: 1, stock:1, thumbnail: 1, description:1, CartCode:1, _id: 0})
    }

    async createCart(product) {
        return await Cart
            .create({
                product: [product]
            })
    }

    async updateCart(id, cart) {
        return await Cart
            .findByIdAndUpdate(id, cart)
    }

    async deleteCart(id) {;
        return await Cart
            .findByIdAndRemove(id)
    }
}