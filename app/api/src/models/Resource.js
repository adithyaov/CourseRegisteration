rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (connection, Sequelize) => connection.define('resource', {
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  code: Sequelize.STRING,
  meta: Sequelize.STRING
});