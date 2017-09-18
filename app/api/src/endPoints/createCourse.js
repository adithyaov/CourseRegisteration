module.exports = (courseFunctions, accessControlHelper, restifyErrors) => {
    return (req, res, next) => {

        const checkAccess = accessControlHelper(req.params.token)

        if (!checkAccess.accessTable.createGroup) {      
            return next(new restifyErrors.UnauthorizedError('Please contact admin'))
        }
        
        courseFunctions.create(req.params.name, req.params.code, req.params.meta)
        .then((resource) => {
            res.json({name: resource.name, type: resource.type, code: resource.code, meta: resource.meta})
            return next()
        })
        .catch((error) => {
            return next(new Error(error))
        })
    }
}