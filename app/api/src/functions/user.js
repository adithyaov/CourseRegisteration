var rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (Resource, User) => {

	return {
		create: (name, email) => {
			return User.create({
				name: name,
				email: email,
				type: 1
			})
			.then(user => {
				return user.get({
					plain: true
				})
			})
			.catch((error) => {
				throw new Error(error)
			})
		},

		find: (id) => {
			return User.findById(id).then(user => {
				return user.get({
					plain: true
				})
			})
			.catch((error) => {
				throw new Error(error)
			})
		},

		delete: (id) => {
			return User.findById(id).then(user => {
				return user.destroy()
			})
			.catch((error) => {
				throw new Error(error)
			})
		},

		addResources: (resourceIds, userId) => {
			return Resource.findAll({
				where: {
					id: resourceIds
				}
			})
			.then((resources) => {
				return User.findById(userId).then((user) => {
					return user.setResources(resources).then((resources) => {
						return resources
					})
					.catch((error) => {
						throw new Error(error)
					})
				})
				.catch((error) => {
					throw new Error(error)
				})
			})
			.catch((error) => {
				throw new Error(error)
			})
		},
        
        addResource: (resourceId, userId) => {
			return Resource.findById(resourceId)
			.then((resource) => {
				return User.findById(userId).then((user) => {
					return user.addResource(resource)
				})
				.catch((error) => {
					throw new Error(error)
				})
			})
			.catch((error) => {
				throw new Error(error)
			})
		},

        addAcceptant: (courseId, userId) => {
			return Resource.findById(courseId)
			.then((course) => {
				if (course.dataValues.type != 'course') {
					throw new Error('Course Id does not belong to a course')
				}
				return User.findById(userId).then((user) => {
					return user.addAcceptant(course)
				})
				.catch((error) => {
					throw new Error(error)
				})
			})
			.catch((error) => {
				throw new Error(error)
			})
		},

		getAllCourses: (userId) => {
			console.log(userId)
			return User.findById(userId).then((user) => {
				return user.getGroups().then((groups) => {
					var allCourses = []
					console.log(groups)
					groups.forEach((g) => {
						console.log(g)
						g.getCourses({
							attributes: ['id', 'name', 'code', 'meta'],
						}).then((courses) => {
							courses.forEach((c) => {
								allCourses.push(c.get({plain: true}))
							}, this);
						})
						.catch((error) => {
							throw new Error(error)
						})
					}, this);
					return allCourses
				})
				.catch((error) => {
					throw new Error(error)
				})
			})
			.catch((error) => {
				throw new Error(error)
			})
		},

		getAcceptedCourses: (userId) => {
			return User.findById(userId).then((user) => {
				return user.getAcceptants({
					attributes: ['id', 'name', 'code', 'meta'],
				}).then((courses) => {
					return courses
				})
				.catch((error) => {
					throw new Error(error)
				})
			})
			.catch((error) => {
				throw new Error(error)
			})
		}

	}


}