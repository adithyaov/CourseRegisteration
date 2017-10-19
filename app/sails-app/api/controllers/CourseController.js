/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'list': async (req, res) => {
		try {
			var authUser = req.session.user;
			var user = await (User.findOne({id: authUser.id})
												.populate(['groupList', 'joinedCourses']))
			groupIds = user.groupList.map(g => g.id)
			var groups = await (Group.find({id: groupIds})
													.populate('courseList'))
			var allCourses = []
			var gIds = []
			var courseObj = {}
			groups.forEach((g) => {
				gIds = g.courseList.map(c => c.id)
				g.courseList.forEach(c => courseObj[c.id] = c)
				allCourses = _.union(gIds, allCourses)
			});
			var joinedIds = user.joinedCourses.map(c => c.id)
			allCourses = allCourses.map(cId => courseObj[cId])
			allCourses.forEach((c) => {
				if (_.includes(joinedIds, c.id)) {c.joined = true} else {c.joined = false};
			})
			res.json({courses: allCourses})
		} catch (e) {
			console.log('e list', e)
			res.json({error: e})
		}
	},
	'owned': async (req, res) => {
		try {
			var authUser = req.session.user
			var user = await User.findOne({id: authUser.id}).populate('coursesOwned')
			cIds = user.coursesOwned.map(c => c.id)
			var courses = await Course.find({id: cIds}).populate('groupList')
			res.json({courses: courses})
		} catch (e) {
			res.json({error: e})
		}
	},
	'join': async (req, res) => {
		try {
			var authUser = req.session.user
			var courseToJoin = req.params.id
			var user, course
			[user, course] = await Promise.all([
				User.findOne({id: authUser.id}).populate('groupList'),
				Course.findOne({id: courseToJoin}).populate('groupList')
			])
			var groupUser = user.groupList.map(g => g.id)
			var groupCourse = course.groupList.map(g => g.id)
			if (_.intersection(groupCourse, groupUser).length > 0) {
				user.joinedCourses.add(courseToJoin);
				user.save((e) => {
					if (e) throw new Error(e)
					else return res.json({joined: true})
				})
			}
		} catch (e) {
			console.log('e edit', e)
			res.json({error: e})
		}
	},
	'leave': async (req, res) => {
		try {
			var authUser = req.session.user;
			var courseToLeave = req.params.id;
			var user = await User.findOne({id: authUser.id})
			user.joinedCourses.remove(courseToLeave)
			user.save((e) => {
				if (e) throw new Error(e)
				else return res.json({left: true})
			})
		} catch (e) {
			console.log('e edit', e)
			res.json({error: e})
		}
	},
	'create': async (req, res) => {
		try {
			var data = {
				name: req.body.name,
				code: req.body.code,
				credits: req.body.credits,
				instructor: req.body.instructor,
				contact: req.body.contact,
				owner: req.session.user.id
			}
			var course = await Course.create(data)
			res.json({course: course})
		} catch (e) {
			res.json({error: e})
		}
	},
	'update': async (req, res) => {
		try {
			var courseId = req.params.id;
			var data = {
				name: req.body.name,
				credits: req.body.credits,
				instructor: req.body.instructor,
				contact: req.body.contact
			}
			var course = await Course.update({id: courseId}, data)
			res.json(course)
		} catch (e) {
			res.json({error: e})
		}
	},
	'delete': (req, res) => {
		try {
			var courseId = req.params.id;
			var course = Course.destroy({id: courseId})
			res.json(course)
		} catch (e) {
			res.json({error: e})
		}
	}
};
