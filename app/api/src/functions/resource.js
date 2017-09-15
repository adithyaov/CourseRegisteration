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
				return resource.get({plain: true})
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
				User.findById(ownerId).then((user) => {
					resource.setOwner(user)
				})
			})
		},

		addResources: (addIds, toId) => {
			Resource.findAll({
			  where: {
			    id: addIds
			  }
			})
			.then((resources) => {
				Resource.findById(toId).then((resource) => {
					resource.setResourceItems(resources)
				})
			})
		}

	}

}