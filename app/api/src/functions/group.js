var rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (Resource) => {

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
		}

	}

}