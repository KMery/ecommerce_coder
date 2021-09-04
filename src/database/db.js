require('dotenv').config();

const urlMongo = `mongodb://localhost:27017/${process.env.DATABASE}`

const mongoose = require("mongoose");
mongoose.connect(urlMongo, {useNewUrlParser: true});

const itemSchema = require('./schemas/item.schema');
const cartSchema = require('./schemas/cart.schema')

const Item = mongoose.model("Products", new mongoose.Schema(itemSchema, { timestamps: true }));
const Cart = mongoose.model("Cart", new mongoose.Schema(cartSchema, { timestamps: true }));

module.exports = {
    Item,
    Cart
}