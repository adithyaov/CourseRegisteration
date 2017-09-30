/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'login': (req, res) => {
		req.session.user = {}
		req.session.user.id = req.params.id
		req.session.user.type = 'owner'
		res.json(req.session.user)
	}
};
