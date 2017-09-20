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
				})
			})
		},
        
        addResource: (resourceId, userId) => {
			return Resource.findById(resourceId)
			.then((resource) => {
				return User.findById(userId).then((user) => {
					return user.addResource(resource)
				})
			})
		},

	}


}