module.exports = (userFunctions, accessControlHelper, restifyErrors) => {
    return (req, res, next) => {

        const checkAccess = accessControlHelper(req.params.token)

        if (!checkAccess.accessTable.createGroup) {      
            return next(new restifyErrors.UnauthorizedError('Please contact admin'))
        }
        
        userFunctions.addResources(req.params.courseIds, checkAccess.payload.id)
        .then((resources) => {
            res.json({status: true, message: 'Added courses', currentCourses: resources})
            return next()
        })
        .catch((error) => {
            return next(new restifyErrors.InternalServerError(error))
        })

    }
}