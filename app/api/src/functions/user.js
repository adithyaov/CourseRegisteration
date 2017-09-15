var rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (Resource, User) => {

	return {
		create: (name, email) => {
			return User.create({
				name: name,
				email: email,
				type: 'member'
			})
			.then(user => {
				return user.get({
					plain: true
				})
			})
		},

		find: (id) => {
			return User.findById(id).then(user => {
				return user.get({
					plain: true
				})
			})
		},

		delete: (id) => {
			return User.findById(id).then(user => {
				return user.destroy()
			})
		},

		addResources: (resourceIds, userId) => {
			Resource.findAll({
			  where: {
			    id: resourceIds
			  }
			})
			.then((resources) => {
				User.findById(userId).then((user) => {
					user.setResources(resources)
				})
			})
		}

	}


}