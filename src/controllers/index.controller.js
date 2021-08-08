const getRoot = (req, res, next) => {
    res.send('Hello this is ecommerce backend!')
}

const setError = (req, res, next) => {
    res.status(404).send({message: 'Page not found'})
}

module.exports = {
    getRoot,
    setError
}