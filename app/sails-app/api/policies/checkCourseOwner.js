module.exports = function(req, res, next) {
  // Checks if you are the owner of a specific Course

  if (!req.session.user) return res.forbidden('You are not permitted to perform this action.');

  if (!req.session.user.id && !req.session.user.type) return res.forbidden('You are not permitted to perform this action.');

  var sessionUser = req.session.user;

  Course.findOne({id: req.params.id}).populate('owner').exec((err, course) => {

    if (err) return res.forbidden('Database Error.');

    if (typeof course.owner == 'undefined') return res.forbidden('No owner?.');

    if (course.owner.id != sessionUser.id) return res.forbidden('You are not owner.');

    return next();

  })

};
