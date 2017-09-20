module.exports = (groupFunctions) => {
    return (req, res, next) => {
        groupFunctions.displayOwnerGroups(req.params.ownerId)
        .then((courses) => {
            res.json({status: true, courses: courses})
            return next()
        })
        .catch((error) => {
            return next(new Error(error))
        })
    }
}
