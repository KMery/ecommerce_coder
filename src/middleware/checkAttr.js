const correct_attr = ['nombre', 'descripcion', 'codigo', 'foto', 'precio', 'stock'];

const checkIfWrongAttr = (req, res, next) => {
    let wrong_attr = [];
    let msg = {};
    Object.keys(req.body).forEach(attr => {
        if (correct_attr.includes(attr) === false) {
            wrong_attr.push(attr);
        }
    });

    if (wrong_attr.length > 0) {
        msg.wrong_attr = `Los siguientes atributos son incorrectos '${wrong_attr}'`;
        return res.status(403).send({error: msg});
    };

    next();
}

const checkIfMissingAttr = (req, res, next) => {
    let missing_attr = [...correct_attr];
    let msg = {};
    Object.keys(req.body).forEach(attr => {
        if (correct_attr.includes(attr)) {
            missing_attr.splice(missing_attr.indexOf(attr), 1);
        }
    });

    if (missing_attr.length > 0) {
        msg.missing_attr = `Faltan los siguientes attributos '${missing_attr}'`;
        return res.status(403).send({error: msg});
    };

    next();
}

module.exports = {
    checkIfWrongAttr,
    checkIfMissingAttr
};