var Sequelize = require('sequelize')

connection = new Sequelize(
	'test',
	'test',
	'',
	{
		host: 'localhost',
		dialect: 'sqlite',
		storage: './testAssoc.sqlite'
	}
)

const User = require('../src/models/User.js')(connection, Sequelize)
const Resource = require('../src/models/Resource.js')(connection, Sequelize)

Resource.belongsTo(User, { as: 'Owner' });

Resource.belongsToMany(User, {through: 'groupUser', as: 'Users'});
User.belongsToMany(Resource, {through: 'groupUser', as: 'Groups'});

Resource.belongsToMany(User, {through: 'acceptanceUser', as: 'Acceptors'});
User.belongsToMany(Resource, {through: 'acceptanceUser', as: 'Acceptants'});

Resource.belongsToMany(Resource, {through: 'groupCourse', as: 'GroupCourses'});


connection.sync({force: true}).then(() => {
	User.create({
		name: 'N1',
		email: 'a@b.com',
		type: 'member'
	})
	.then((user) => {
		Resource.create({
			name: 'R1',
			type: 'group'
		})
		.then((group) => {
			Resource.create({
				name: 'R2',
				type: 'course'
			})
			.then((course) => {
				console.log(user.dataValues)
				console.log(group.dataValues)
				console.log(course.dataValues)
				group.addGroupCourse(course)
				user.addAcceptants(course)
			})
		})
	})
})