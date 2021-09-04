const ItemDAO = require('../database/dao/item');

module.exports = class ItemService {
    constructor() {}
    
    async getItems() {
        const itemDAO = new ItemDAO();
        return itemDAO.getItems();
    }

    async getItemByName(title) {
        const itemDAO = new ItemDAO();
        return itemDAO.getItemByName(title);
    }

    async getItemByItemCode(itemCode) {
        const itemDAO = new ItemDAO();
        return itemDAO.getItemByItemCode(itemCode);
    }

    async getItemByPriceRange(min, max) {
        const itemDAO = new ItemDAO();
        return itemDAO.getItemByPriceRange(min, max);
    }

    async getItemByStockRange(min, max) {
        const itemDAO = new ItemDAO();
        return itemDAO.getItemByStockRange(min, max);
    }

    async getItemById(id) {
        const itemDAO = new ItemDAO();
        return itemDAO.getItemById(id);
    }

    async createItem(item) {
        const itemDAO = new ItemDAO();
        return itemDAO.createItem(item);
    }

    async updateItem(id, item) {
        const itemDAO = new ItemDAO();
        return itemDAO.updateItem(id, item);
    }

    async deleteItem(id) {
        const itemDAO = new ItemDAO();
        return itemDAO.deleteItem(id);
    }
};