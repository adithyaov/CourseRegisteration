/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var GoogleAuth = require('google-auth-library');
var CLIENT_ID = '578466896799-k9k6ugjrb3rncqsg8jbfcpeoar8bgndl.apps.googleusercontent.com'

module.exports = {
	'loginStatus': (req, res) => {
		var user = req.session.user
		res.json({user: user})
	},
	'logout': (req, res) => {
		req.session.user = {}
		res.json({user: false})
	},
	'authenticate': (req, res) => {
		try {
			token = req.body.token
			var auth = new GoogleAuth;
			var client = new auth.OAuth2(CLIENT_ID, '', '');
			client.verifyIdToken(
				token,
				CLIENT_ID,
				async function(e, login) {
					if (e) {
						return res.json({error: e})
					}
					var payload = login.getPayload();
					var userid = payload['sub'];
					var domain = payload['hd'];
					if (domain !== 'iitpkd.ac.in' && domain !== 'smail.iitpkd.ac.in') {
						return res.json({error: 'Not an IIT PKD acccount.', domain: domain})
					}
					createCriteria = {
						name: payload.name,
						email: payload.email,
						type: 'user'
					}
					findCriteria = {
						email: payload.email
					}
					var user = await User.findOrCreate(findCriteria, createCriteria)
					req.session.user = user
					res.json({user: user})
				}
			);
		} catch (e) {
			res.json({error: e})
		}
	},
	'create': async (req, res) => {
		try {
			var data = {
				name: req.body.name,
				email: req.body.email,
				type: 'user'
			}
			var user = await User.create(data)
			var groupCodes = req.body.groupCodes
			var validGroups = await Group.find({code: groupCodes})
			user.groupList.add(validGroups)
			user.save((e) => {
				if (e) {
					User.destroy({id: user.id})
					throw Error(e)
				} else {
					res.json({status: true})
				}
			})
		} catch (e) {
			console.log(e);
			res.json({error: e})
		}
	},
};
