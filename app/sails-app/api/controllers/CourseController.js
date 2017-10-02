/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'list': (req, res) => {
		var sessionUser = req.session.user;
		User.findOne({id: sessionUser.id})
		.populate(['groupList', 'joinedCourses'])
		.then((user) => {
			groupIds = user.groupList.map(g => g.id)
			Group.find({id: groupIds})
			.populate('courseList').then((groups) => {
				var allCourses = []
				groups.forEach((g) => {
					allCourses = _.union(g.courseList, allCourses)
				});
				joinedIds = user.joinedCourses.map(c => c.id)
				allCourses.forEach((c) => {
					if (_.includes(joinedIds, c.id)) {c.joined = true} else {c.joined = false};
				})
				res.view({courses: allCourses});
			}).catch((err) => res.json({error: err}))
		}).catch((err) => res.json({error: err}))
	},
	'new': (req, res) => {
		var sessionUser = req.session.user;
		User.findOne({id: sessionUser.id})
		.populate('coursesOwned')
		.then((user) => res.view({courses: user.coursesOwned}))
		.catch((err) => res.json({error: err}))
	},
	'edit': (req, res) => {
		var courseId = req.params.id;
		Course.findOne({id: courseId})
		.then((course) => res.view({course: course}))
		.catch((err) => res.json({error: err}))
	},
	'join': (req, res) => {
		var sessionUser = req.session.user;
		var courseToJoin = req.params.id;
		Promise.all([
			User.findOne({id: sessionUser.id}).populate('groupList'),
			Course.findOne({id: courseToJoin}).populate('groupList')
		])
		.then(([user, course]) => {
			var groupUser = user.groupList.map(g => g.id);
			var groupCourse = course.groupList.map(g => g.id);
			if (_.intersection(groupCourse, groupUser).length > 0) {
				user.joinedCourses.add(courseToJoin);
				user.save((err) => {
					if (err) return res.json({error: err});
					return res.json({added: true});
				});
			}
		}).catch((err) => res.json({status: false, error: err}))
	},
	'leave': (req, res) => {
		var sessionUser = req.session.user;
		var courseToLeave = req.params.id;
		User.findOne({id: sessionUser.id})
		.then((user) => {
			user.joinedCourses.remove(courseToLeave);
			user.save((err) => {
				if (err) return res.json({error: err});
				return res.json({});
			});
		}).catch((err) => res.json({error: err}))
	},
	'create': (req, res) => {
		var data = {
			name: req.body.name,
			code: req.body.code,
			credits: req.body.credits,
			instructor: req.body.instructor,
			contact: req.body.contact,
			owner: req.session.user.id
		}
		Course.create(data)
		.then((user) => res.json({user: user}))
		.catch((err) => res.json({error: err}))
	},
	'update': (req, res) => {
		var courseId = req.params.id;
		var data = {
			name: req.body.name,
			credits: req.body.credits,
			instructor: req.body.instructor,
			contact: req.body.contact
		}
		Course.update({id: courseId}, data)
		.then(() => res.json({}))
		.catch((err) => res.json({error: err}))

	},
	'delete': (req, res) => {
		var courseId = req.params.id;
		Course.destroy({id: courseId})
		.then(() => res.json({}))
		.catch((err) => res.json({error: err}))
	}
};
