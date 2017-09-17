rootPath = '/home/altair/Prog/courseApp/app/testing/make-scratch'

module.exports = (connection, Sequelize) => connection.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  type: Sequelize.INTEGER
});