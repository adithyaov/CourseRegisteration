/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': (req, res) => {
		var sessionUser = req.session.user;
		User.findOne({id: sessionUser.id}).populate('coursesOwned').exec((err, user) => {
			console.log(user);
			console.log(user.coursesOwned);
			if (err) {
				return res.json({error: err})
			}
			return res.view({courses: user.coursesOwned})
		})
	},
	'edit': (req, res) => {
		var courseId = req.params.id;
		Course.findOne({id: courseId}).exec((err, course) => {
			if (err) {
				return res.json({error: err})
			}
			return res.view({course: course})
		})
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
		Course.create(data).exec((err, user) => {
			if (err) {
				return res.send(err);
			}
			res.redirect('/course/new');
		})
	},
	'update': (req, res) => {
		var courseId = req.params.id;
		var data = {
			name: req.body.name,
			credits: req.body.credits,
			instructor: req.body.instructor,
			contact: req.body.contact,
			owner: req.session.user.id
		}
		Course.update({id: courseId}, data).exec((err) => {
			if (err) {
				return res.send(err);
			}
			res.redirect('/course/new');
		})
	},
	'delete': (req, res) => {
		var courseId = req.params.id;
		Course.destroy({id: courseId}).exec((err) => {
			if (err) {
				return res.send(err);
			}
			res.redirect('/course/new');
		})
	}
};
