var rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (Resource, User) => {

	return {

		create: (name, code, meta) => {
			return Resource.create({
				name: name,
				code: code,
				type: 'group',
				meta: meta
			})
			.then((resource) => {
				return resource.get({
					plain: true
				})
			})
			.catch((error) => {
				throw new Error(error)
			})
		},

		addUsers: (userIds, groupId) => {
			return User.findAll({
				where: {
					id: userIds
				}
			})
			.then((users) => {
				return Resource.findById(groupId).then((resource) => {
					console.log(resource)
					return resource.setUsers(userIds).then((users) => {
						return users
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

		addCourses: (courseIds, groupId) => {
			return Resource.findAll({
				where: {
					id: courseIds,
					type: 'course'
				}
			})
			.then((courses) => {
				return Resource.findById(groupId).then((group) => {
                    if (group.dataValues.type != 'group') {
                        throw new Error('Group with id ' + groupId + ' does not exist')
                    }
					return group.setCourses(courses).then((statusCourses) => {
						return statusCourses
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

		displayOwnerGroups: (ownerId) => {
			return Resource.findAll({
				attributes: ['id', 'name', 'code', 'meta'],
				where: {
					OwnerId: ownerId,
					type: 'group'
				}
			})
			.then((resources) => {
				return resources
			})
			.catch((error) => {
				throw new Error(error)
			})
		}

	}

}