module.exports = (resourceFunctions) => {
    return (req, res, next) => {
        resourceFunctions.find(req.params.id)
        .then((resource) => {
            res.json({name: resource.name, type: resource.type, code: resource.code, meta: resource.meta})
            return next()
        })
        .catch((error) => {
            return next(new Error(error))
        })
    }
}
