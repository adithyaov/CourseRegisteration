module.exports = (userFunctions) => {
    return (req, res, next) => {
        userFunctions.find(req.params.id)
        .then((user) => {
            res.json({name: user.name, email: user.email})
            return next()
        })
        .catch((error) => {
            return next(new Error(error))
        })
    }
}