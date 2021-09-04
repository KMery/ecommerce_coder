const validateIdMongo = (req, res, next) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        next()
    } else {
        return res.status(404).send({error: "Formato Id incorrecto"})
    }
}

module.exports = validateIdMongo;