module.exports = async function (req, res, next) {

  try {
    var sessionUser = req.session.user
    var groupId = req.params.id
    var group = await Group.findOne({id: groupId}).populate('owner')
    if (group.owner.id === sessionUser.id) return next()
    return res.json({error: 'Invalid Auth.'})
  } catch (e) {
    return res.json({error: e})
  }


};
