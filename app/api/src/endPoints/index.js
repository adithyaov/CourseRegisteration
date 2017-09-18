module.exports = (userFunctions, resourceFunctions, groupFunctions, courseFunctions) => {
    return {
        hello: require('./helloWorld.js')(),
        createUser: require('./createUser.js')(userFunctions),
        displayUser: require('./displayUser.js')(userFunctions)
    }
}

// changeAccess: require('./changeAccess.js')(),
// issueToken: require('./issueToken.js')(),
// chooseCourse: require('./chooseCourse.js')(),
// displayCourses: require('./displayCourses.js')(),
// displayGroups: require('./displayGroups.js')(),
// displayResource: require('./displayResource.js')(),
// createResource: require('./createResource.js')(),
// updateResource: require('./updateResource.js')(),
// deleteResource: require('./deleteResource.js')(),