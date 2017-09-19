module.exports = (resourceFunctions, accessControlHelper, restifyErrors) => {
    return (req, res, next) => {

        const checkAccess = accessControlHelper(req.params.token)

        if (!checkAccess.accessTable.createGroup) {      
            return next(new restifyErrors.UnauthorizedError('Please contact admin'))
        }        

        resourceFunctions.find(req.params.id)
        .then((resource) => {
            if (resource.OwnerId != checkAccess.payload.id) {
                return next(new restifyErrors.UnauthorizedError('You are not authorized to access this resource'))
            }
            resourceFunctions.update(req.params.id, req.params.name, req.params.meta)
            .then(() => {
                res.json({status: true, message: 'Successfully updated'})
                next()
            })
            .catch((error) => {
                return next(new restifyErrors.InternalServerError(error))
            })
        })


    }
}