/**
 * CourseController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'owned': async (req, res) => {
		try {
			var authUser = req.session.user
			var user = await User.findOne({id: authUser.id}).populate('groupsOwned')
			gIds = user.groupsOwned.map(x => x.id)
			var groups = await Group.find({id: gIds, sort: 'createdAt DESC'}).populate('userList')
			res.json({groups: groups})
		} catch (e) {
			res.json({error: e})
		}
	},
	'create': async (req, res) => {
		try {
			var data = {
				name: req.body.name,
				code: req.body.code,
				contact: req.body.contact,
				owner: req.session.user.id
			}
			var group = await Group.create(data)
			var userEmails = req.body.userEmails.split(',')
																		 .map(x => x.trim())
																		 .filter(x => x.length > 0)
			var validUsers = await User.find({email: userEmails})
			group.userList.add(validUsers)
			var validUserEmails = validUsers.map(x => x.email)
			group.save((e) => {
				if (e) {
					Group.destroy({id: group.id})
					throw Error(e)
				} else {
					res.json({group: group, validUserEmails: validUserEmails})
				}
			})
		} catch (e) {
			console.log(e);
			res.json({error: e})
		}
	},
	'update': async (req, res) => {
		try {
			var groupId = req.params.id;
			var data = {
				name: req.body.name,
				contact: req.body.contact,
				owner: req.session.user.id
			}
			var userEmails = req.body.userEmails.split(',')
																		 			.map(x => x.trim())
																		 			.filter(x => x.length > 0)
			var validUsers = await User.find({email: userEmails})
			var validUserEmails = validUsers.map(x => x.email)
			var validUserIds = validUsers.map(x => x.id)
			console.log(validUsers);
			update = await Group.update({id: groupId}, data)
			console.log(update);
			group = await Group.findOne({id: groupId}).populate('userList')
			userIds = group.userList.map(x => x.id)
			var usersToAdd = _.difference(validUserIds, userIds)
			var usersToRemove = _.difference(userIds, validUserIds)
			group.userList.remove(usersToRemove)
			group.userList.add(usersToAdd)
			group.save((e) => {
				if (e) {
					throw Error(e)
				} else {
					res.json({updated: true, validUserEmails: validUserEmails})
				}
			})
		} catch (e) {
			res.json({error: e})
		}
	},
	'delete': async (req, res) => {
		try {
			var groupId = req.params.id;
			var group = await Group.destroy({id: groupId})
			res.json({deleted: true})
		} catch (e) {
			res.json({error: e})
		}
	}
};
