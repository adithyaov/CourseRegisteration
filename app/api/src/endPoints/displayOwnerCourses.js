module.exports = (courseFunctions) => {
    return (req, res, next) => {
        courseFunctions.displayOwnerCourses(req.params.id)
        .then((courses) => {
            res.json({status: true, courses: courses})
            return next()
        })
        .catch((error) => {
            return next(new Error(error))
        })
    }
}
