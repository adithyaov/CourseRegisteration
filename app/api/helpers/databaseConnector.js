var rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (Sequelize, databaseConfig) => new Sequelize(
	databaseConfig['database'],
	databaseConfig['username'],
	databaseConfig['password'],
	{
		host: databaseConfig['host'],
		dialect: databaseConfig['dialect'],
		storage: databaseConfig['storage']
	}
)
