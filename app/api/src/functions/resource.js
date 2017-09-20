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
		},


        findOrCreate: (where, defaults) => {
            console.log(where)
            console.log(defaults)
			return Resource.findOrCreate({
                where: where,
                defaults: defaults
			})
			.spread((resource, created) => {
				return resource.get({
					plain: true
				})
			})
		}


	}

}
