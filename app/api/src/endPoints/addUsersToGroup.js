module.exports = (resourceFunctions, groupFunctions, accessControlHelper, restifyErrors) => {
    return (req, res, next) => {

        const checkAccess = accessControlHelper(req.params.token)

        if (!checkAccess.accessTable.createGroup) {      
            return next(new restifyErrors.UnauthorizedError('Please contact admin'))
        }

        resourceFunctions.find(req.params.groupId)
        .then((resource) => {
            if (resource.OwnerId != checkAccess.payload.id) {
                return next(new restifyErrors.UnauthorizedError('You are not authorized to access this resource'))
            }
            if (resource.type != 'group') {
                return next(new restifyErrors.NotFoundError('This resource is not a group'))
            }
            groupFunctions.addUsers(req.params.userIds, req.params.groupId)
            .then((statusUsers) => {
                res.json({status: true, message: 'Added users', statusUsers: statusUsers})
                return next()
            })
            .catch((error) => {
                return next(new restifyErrors.InternalServerError(error))
            })

        })


    }
}