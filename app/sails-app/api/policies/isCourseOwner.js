module.exports = async function (req, res, next) {

  try {
    var sessionUser = req.session.user
    var courseId = req.params.id
    var course = await Course.findOne({id: courseId}).populate('owner')
    if (course.owner.id === sessionUser.id) return next()
    return res.json({error: 'Invalid Auth.'})
  } catch (e) {
    return res.json({error: e})
  }


};
