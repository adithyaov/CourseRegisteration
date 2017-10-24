module.exports = function (req, res, next) {

  try {
    var sessionUser = req.session.user
    var score = Score.get(sessionUser.type)
    if (score >= 1) return next();
    return res.json({error: 'Invalid Auth.'})
  } catch (e) {
    return res.json({error: e})
  }


};
