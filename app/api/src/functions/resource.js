var rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (Resource, User) => {

	return {

		find: (id) => {
			return Resource.findById(id).then((resource) => {
				return resource.get({plain: true})
			})
		},

		delete: (id) => {
			return Resource.findById(id).then((resource) => {
				return resource.destroy()
			})
		},

		update: (id, name, meta) => {
			return Resource.findById(id).then((resource) => {
				return resource
			})
			.then((resource) => {
				fieldsToUpdate = []
				if (resource.name != name) {
					fieldsToUpdate.push('name');
				}
				if (resource.meta != meta) {
					fieldsToUpdate.push('meta');
				}
				resource.update({
					name: name,
					meta: meta
				}, {fields: fieldsToUpdate})
			})
		},

		setOwner: (resourceId, ownerId) => {
			return Resource.findById(resourceId).then((resource) => {
				return resource
			})
			.then((resource) => {
				return User.findById(ownerId).then((user) => {
					resource.setOwner(user)
					return resource.get({plain: true})
				})
			})
		},

		addResources: (addIds, toId) => {
			return Resource.findAll({
			  where: {
				id: addIds,
				type: 'course'
			  }
			})
			.then((resources) => {
				return Resource.findById(toId).then((group) => {
					return group.setResourceItems(resources).then((courses) => {
						return courses
					})
				})
			})
		},

		addUsers: (userIds, resourceId) => {
			return User.findAll({
			  where: {
			    id: userIds
			  }
			})
			.then((users) => {
				return Resource.findById(resourceId).then((resource) => {
					return resource.setUsers(userIds).then((users) => {
						return users
					})
				})
			})
		}

	}

}