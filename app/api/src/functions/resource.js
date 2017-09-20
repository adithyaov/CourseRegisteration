var rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (Resource, User) => {

	return {

		find: (id) => {
			return Resource.findById(id).then((resource) => {
				return resource.get({plain: true})
			})
			.catch((error) => {
				throw new Error(error)
			})
		},

		delete: (id) => {
			return Resource.findById(id).then((resource) => {
				return resource.destroy()
			})
			.catch((error) => {
				throw new Error(error)
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
				.catch((error) => {
					throw new Error(error)
				})
			})
			.catch((error) => {
				throw new Error(error)
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
				.catch((error) => {
					throw new Error(error)
				})
			})
			.catch((error) => {
				throw new Error(error)
			})
		},

	}

}
