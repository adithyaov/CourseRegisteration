module.exports = (userFunctions, resourceFunctions, accessControlHelper, restifyErrors) => {
    return (req, res, next) => {

        const checkAccess = accessControlHelper(req.params.token)

        if (!checkAccess.accessTable.createGroup) {      
            return next(new restifyErrors.UnauthorizedError('Please contact admin'))
        }
        
        
        resourceFunctions.find(req.params.courseId).then((course) => {
            userFunctions.addAcceptant(course.id, req.params.userId).then(() => {
                res.json({status: true, message: 'Course joined'})
                return next()
            })
        })
        .catch((error) => {
            return next(new restifyErrors.InternalServerError(error))
        })

    }
}

// This is improper, make it proper or change design
