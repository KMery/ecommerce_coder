const CartDAO = require('../database/dao/cart');

module.exports = class CartService {
    constructor() {}
    
    async getCarts() {
        const cartDAO = new CartDAO();
        return cartDAO.getCarts();
    }

    async getCartById(id) {
        const cartDAO = new CartDAO();
        return cartDAO.getCartById(id);
    }

    async createCart(Cart) {
        const cartDAO = new CartDAO();
        return cartDAO.createCart(Cart);
    }

    async updateCart(id, Cart) {
        const cartDAO = new CartDAO();
        return cartDAO.updateCart(id, Cart);
    }

    async deleteCart(id) {
        const cartDAO = new CartDAO();
        return cartDAO.deleteCart(id);
    }
};