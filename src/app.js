const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 8080;

const router = require('./routes/routes');
app.use(router);

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});