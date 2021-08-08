const admin = true; //Administrador seteado temporalmente desde acá

const auth = (req, res, next) => {

    if (!admin) {
        let msg = `No tienes autorización de ingreso en '${req.originalUrl}' con método ${req.method}`;
        return res.status(403).send({error: msg});
    }

    next()
}
module.exports = auth;