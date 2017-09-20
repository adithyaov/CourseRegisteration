module.exports = (userFunctions, resourceFunctions, groupFunctions, courseFunctions, accessControlHelper, restifyErrors) => {
    return {
        hello: require('./helloWorld.js')(),
        createUser: require('./createUser.js')(userFunctions),
        displayUser: require('./displayUser.js')(userFunctions),

        displayResource: require('./displayResource.js')(resourceFunctions),
        createGroup: require('./createGroup.js')(groupFunctions, resourceFunctions, accessControlHelper, restifyErrors),
        createCourse: require('./createCourse.js')(courseFunctions, resourceFunctions, accessControlHelper, restifyErrors),

        updateResource: require('./updateResource.js')(resourceFunctions, accessControlHelper, restifyErrors),
        deleteResource: require('./deleteResource.js')(resourceFunctions, accessControlHelper, restifyErrors),
    
    
        chooseCourse: require('./chooseCourse.js')(userFunctions, resourceFunctions, accessControlHelper, restifyErrors),
        addUsersToGroup: require('./addUsersToGroup.js')(resourceFunctions, accessControlHelper, restifyErrors),
        addCoursesToGroup: require('./addCoursesToGroup.js')(resourceFunctions, accessControlHelper, restifyErrors),
    
    }
}

// changeAccess: require('./changeAccess.js')(),
// issueToken: require('./issueToken.js')(),
// displayCourses: require('./displayCourses.js')(),
// displayGroups: require('./displayGroups.js')(),
