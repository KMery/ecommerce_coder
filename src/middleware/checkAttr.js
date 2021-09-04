//Control de atributos mandados
const product_data = ['title', 'price', 'thumbnail', 'stock', 'description', 'itemCode'];
const cart_data = ['product'];

//Validación de atributos que envia el cliente
const checkAttr = (req, res, next) => {
    let list_of_required = (req.originalUrl.includes('productos')) ? product_data : cart_data; 

    let required_data = requiredData(req, list_of_required);
    let wrong_data = checkWrongData(req, list_of_required);

    let msg = [];
    if (required_data !== undefined) {
        msg.push(required_data);
    };

    if (wrong_data !== undefined) {
        msg.push(wrong_data);
    };

    if (msg.length > 0) {
        return res.status(400).send(msg);
    };

    next();
}

//Valida si están los campos requeridos
const requiredData = (req, list_of_required) => {
    let required_data = [];

    list_of_required.forEach(attr => {
        if (req.body[attr] === undefined) {
            required_data.push(attr)
        }
    });

    if (required_data.length > 0) {
        let msg = {
            'error': {
                'required fields': required_data
            }
        };
        return msg;
    };
}

//Valida si existe data erronea
const checkWrongData = (req, list_of_required) => {
    let wrong_data = [];

    Object.keys(req.body).forEach(attribute => {
        if (list_of_required.includes(attribute) === false) {
            wrong_data.push(attribute);
        };
    });

    if (wrong_data.length > 0) {
        let msg = {
            'error': {
                'wrong data': wrong_data
            }
        };
        return msg;
    };
};

module.exports = checkAttr;