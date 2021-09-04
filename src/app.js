require("dotenv").config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 8080;

const productRouter = require('./routes/product.route');
const cartRouter = require('./routes/cart.route');
const searchRouter = require('./routes/search.route');
const indexRouter = require('./routes/index.route');

app.use(productRouter);
app.use(cartRouter);
app.use(searchRouter);
app.use(indexRouter);

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});