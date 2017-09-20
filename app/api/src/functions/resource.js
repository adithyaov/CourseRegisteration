var rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (Resource, User) => {

	return {

		find: (id) => {
			return Resource.findById(id).then((resource) => {
				return resource.get({plain: true})
			})
			.catch((error) => {
				return new Error(error)
			})
		},

		delete: (id) => {
			return Resource.findById(id).then((resource) => {
				return resource.destroy()
			})
			.catch((error) => {
				return new Error(error)
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
					return new Error(error)
				})
			})
			.catch((error) => {
				return new Error(error)
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
					return new Error(error)
				})
			})
			.catch((error) => {
				return new Error(error)
			})
		},

		addResources: (addIds, toId, addIdsType='course', toIdType='group') => {
			return Resource.findAll({
				where: {
					id: addIds,
					type: addIdsType
				}
			})
			.then((resources) => {
				return Resource.findById(toId).then((group) => {
                    if (group.dataValues.type != toIdType) {
                        throw new Error('Resource Id does not belong to a group')
                    }
					return group.setResourceItems(resources).then((courses) => {
						return courses
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


        findOrCreate: (where, defaults) => {
			return Resource.findOrCreate({
                where: where,
                defaults: defaults
			})
			.spread((resource, created) => {
				return resource.get({
					plain: true
				})
			})
			.catch((error) => {
				return new Error(error)
			})
		}


	}

}
