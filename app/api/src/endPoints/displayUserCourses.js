module.exports = (userFunctions) => {
    return (req, res, next) => {
        userFunctions.getAllCourses(req.params.userId)
        .then((all) => {
            userFunctions.getAcceptedCourses(req.params.userId)
            .then((accepted) => {
                res.json({status: true, all: all, accepted: accepted})
                return next()
            })
            .catch((error) => {
                return next(new Error(error))
            })
        })
        .catch((error) => {
            return next(new Error(error))
        })
    }
}
