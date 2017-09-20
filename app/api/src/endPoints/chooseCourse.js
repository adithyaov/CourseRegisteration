module.exports = (userFunctions, resourceFunctions, accessControlHelper, restifyErrors) => {
    return (req, res, next) => {

        const checkAccess = accessControlHelper(req.params.token)

        if (!checkAccess.accessTable.createGroup) {      
            return next(new restifyErrors.UnauthorizedError('Please contact admin'))
        }
        
        
        resourceFunctions.find(req.params.courseId).then((course) => {
            resourceFunctions.findOrCreate({code: course.code, type: 'acceptance'},
                                           {name: course.name, code: 'a_' + course.code, meta: course.meta, type: 'acceptance'})
            .then((acceptance) => {
                userFunctions.addResource(acceptance.id, req.params.userId).then(() => {
                    res.json({status: true, message: 'Course joined'})
                    return next()
                })
            })
        })
        .catch((error) => {
            return next(new restifyErrors.InternalServerError(error))
        })

    }
}

// This is improper, make it proper or change design