var rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (Resource) => {

	return {

		create: (name, code, meta) => {
			return Resource.create({
				name: name,
				code: code,
				type: 'course',
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

		displayOwnerCourses: (ownerId) => {
			return Resource.findAll({
				attributes: ['id', 'name', 'code', 'meta'],
				where: {
					OwnerId: ownerId,
					type: 'course'
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