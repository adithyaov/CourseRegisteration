var rootPath = '/home/altair/Prog/courseApp/app/api'

var Sequelize = require('sequelize')
var jwt = require('jsonwebtoken')
var restify = require('restify');

const connection = require(rootPath + '/helpers/databaseConnector.js')(Sequelize, require(rootPath + '/config/database.js'))
const User = require(rootPath + '/src/models/User.js')(connection, Sequelize)
const Resource = require(rootPath + '/src/models/Resource.js')(connection, Sequelize)

Resource.belongsTo(User, { as: 'Owner' });
Resource.belongsToMany(User, {through: 'ResourceUser'});
User.belongsToMany(Resource, {through: 'ResourceUser'});
Resource.belongsToMany(Resource, {through: 'ResourceResource', as: "ResourceItems"});

var userFunctions = require(rootPath + '/src/functions/user.js')(Resource, User)
var resourceFunctions = require(rootPath + '/src/functions/resource.js')(Resource, User)
var groupFunctions = require(rootPath + '/src/functions/group.js')(Resource)
var courseFunctions = require(rootPath + '/src/functions/course.js')(Resource)

var jwtHelper = require(rootPath + '/helpers/jwt.js')(jwt, require(rootPath + '/config/jwt.js'))

// connection.sync()
// .then(() => resourceFunctions.addResources([1], 1))
// .catch((error) => {
//     console.log(error)
// })

// jwtHelper.encode({name: 'Adithya'}, (error, token) => {
//     if (error) {
//         console.log('Error')
//     }else{
//         console.log(token)
//     }
// })

var server = restify.createServer();

var endPoints = require(rootPath + '/src/endPoints/index.js')()
var endPointsConfig = require(rootPath + '/config/endPoints.js')
var endPointsHelper = require(rootPath + '/helpers/endPoints.js')(endPointsConfig, endPoints)

var accessControlConfig = require(rootPath + '/config/accessControl.js')
var accessControlHelper = require(rootPath + '/helpers/accessControl.js')(accessControlConfig, jwtHelper.decode)

jwtHelper.encode({type: 0}, (error, token) => {
    if (error) {
        console.log('Error')
    }else{
        console.log(accessControlHelper)
        console.log(accessControlHelper(token))
    }
})

// connection.sync()
// .then(() => {

//     endPointsHelper.forEach((value) => {
//         switch(value.method){
//             case 'get': server.get(value.pattern, value.target); break;
//             case 'post': server.post(value.pattern, value.target); break;
//             case 'put': server.put(value.pattern, value.target); break;
//             case 'delete': server.delete(value.pattern, value.target); break;
//         }
//     });

//     server.listen(8080, function() {
//         console.log('%s listening at %s', server.name, server.url);
//     });
    
// })