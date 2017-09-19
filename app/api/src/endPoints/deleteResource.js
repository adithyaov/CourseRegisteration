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
            resourceFunctions.delete(req.params.id)
            .then(() => {
                res.json({status: true, message: 'Successfully deleted'})
                next()
            })
            .catch((error) => {
                return next(new restifyErrors.InternalServerError(error))
            })
        })
    }
}