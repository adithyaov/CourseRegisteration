module.exports = (userFunctions) => {
    return (req, res, next) => {
        console.log(req.params)
        userFunctions.create(req.params.name, req.params.email)
        .then((user) => {
            res.json({name: user.name, email: user.email})
            return next()
        })
        .catch((error) => {
            return next(new Error(error))
        })
    }
}