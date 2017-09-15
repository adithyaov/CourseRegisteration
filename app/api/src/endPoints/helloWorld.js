module.exports = () => {
    return (req, res, next) => {
        res.json({message: 'Hello :-)'})
        next()
    }
}