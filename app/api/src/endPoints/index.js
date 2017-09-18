module.exports = (userFunctions, resourceFunctions, groupFunctions, courseFunctions, accessControlHelper, restifyErrors) => {
    return {
        hello: require('./helloWorld.js')(),
        createUser: require('./createUser.js')(userFunctions),
        displayUser: require('./displayUser.js')(userFunctions),

        displayResource: require('./displayResource.js')(resourceFunctions),
        createGroup: require('./createGroup.js')(groupFunctions, accessControlHelper, restifyErrors),
        createCourse: require('./createCourse.js')(courseFunctions, accessControlHelper, restifyErrors),

    }
}

// changeAccess: require('./changeAccess.js')(),
// issueToken: require('./issueToken.js')(),
// chooseCourse: require('./chooseCourse.js')(),
// displayCourses: require('./displayCourses.js')(),
// displayGroups: require('./displayGroups.js')(),

// updateResource: require('./updateResource.js')(resourceFunctions, accessControlHelper),
// deleteResource: require('./deleteResource.js')(resourceFunctions, accessControlHelper),