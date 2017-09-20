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
				})
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
                        throw new Error('Group Id does not belong to a group')
                    }
					return group.setGroupCourses(courses).then((statusCourses) => {
						return statusCourses
					})
				})
			})
		},

	}

}