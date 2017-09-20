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
				return new Error(error)
			})
		},

		find: (id) => {
			return User.findById(id).then(user => {
				return user.get({
					plain: true
				})
			})
			.catch((error) => {
				return new Error(error)
			})
		},

		delete: (id) => {
			return User.findById(id).then(user => {
				return user.destroy()
			})
			.catch((error) => {
				return new Error(error)
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
						return new Error(error)
					})
				})
				.catch((error) => {
					return new Error(error)
				})
			})
			.catch((error) => {
				return new Error(error)
			})
		},
        
        addResource: (resourceId, userId) => {
			return Resource.findById(resourceId)
			.then((resource) => {
				return User.findById(userId).then((user) => {
					return user.addResource(resource)
				})
				.catch((error) => {
					return new Error(error)
				})
			})
			.catch((error) => {
				return new Error(error)
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
					return new Error(error)
				})
			})
			.catch((error) => {
				return new Error(error)
			})
		},

		// userAcceptance: (userId, courseCode) => {
		// 	return User.findById(userId).then((user) => {
		// 		return user.getResources({
		// 			where: {
		// 				code: 'a_' + courseCode,
		// 				type: 'acceptance'
		// 			}
		// 		})
		// 		.then((acceptanceArray) => {
		// 			if (acceptanceArray.length == 1){
		// 				return true
		// 			} else {
		// 				return false
		// 			}
		// 		})
		// 	})
		// },

		// displayUserCourses: (userId) => {
		// 	User.findById(userId).then((user) => {
		// 		user.getResources({
		// 			where: {
		// 				type: 'course'
		// 			}
		// 		})
		// 		.then((courses) => {
		// 			user.getResources({
		// 				where: {
		// 					type: 'acceptance'
		// 				}
		// 			})
		// 			.then((acceptances) => {

		// 			})
		// 		})
		// 	})
		// }

	}


}