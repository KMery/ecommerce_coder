const { Item } = require('../db')

module.exports = class ItemDAO {
    async getItems() {
        return await Item
            .find({})
    }

    async getItemByName(title) {
        return await Item
            .find({title: title})
    }

    async getItemByItemCode(itemCode) {
        return await Item
            .find({itemCode: itemCode})
    }

    async getItemByPriceRange(min, max) {
        return await Item
            .find({
                price: { $gte: min, $lte: max }
            });
    }

    async getItemByStockRange(min, max) {
        return await Item
            .find({
                stock: { $gte: min, $lte: max }
            })
    }

    async getItemById(id) {
        return await Item
            .findById(id, {title:1, price: 1, stock:1, thumbnail: 1, description:1, itemCode:1, _id: 1})
    }

    async createItem({ title, price, thumbnail, stock, description, itemCode }) {
        return await Item
            .create({
                title,
                price,
                thumbnail,
                stock,
                description,
                itemCode
            })
    }

    async updateItem(id, item) {;
        return await Item
            .findByIdAndUpdate(id, item)
    }

    async deleteItem(id) {;
        return await Item
            .findByIdAndRemove(id)
    }
}