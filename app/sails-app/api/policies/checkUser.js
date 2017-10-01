module.exports = function(req, res, next) {
  // Checks for owner

  if (!req.session.user) return res.forbidden('You are not permitted to perform this action.');

  if (!req.session.user.id && !req.session.user.type) return res.forbidden('You are not permitted to perform this action.');

  var sessionUser = req.session.user;

  if (sessionUser.type != 'user' && sessionUser.type != 'owner' && sessionUser.type != 'admin') res.forbidden('You are not owner');

  return next();

};
