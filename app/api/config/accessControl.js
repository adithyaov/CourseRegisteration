module.exports = {
    types: {everyone: 0, user: 1, owner: 2, admin: 3},
    targetsToConsider: ['hello', 'chooseCourse', 'displayCourses',
                        'displayResource', 'createCourse', 'createGroup',
                        'chooseCourse', 'addUsersToGroup', 'addCoursesToGroup'],
    accessTargets: {
        hello: 'everyone',
        createUser: 'everyone',
        displayUser: 'everyone',

        displayResource: 'everyone',

        createGroup: 'owner',
        createCourse: 'owner',

        chooseCourse: 'user',
        addUsersToGroup: 'owner',
        addCoursesToGroup: 'owner'
    }
}

// updateResource: 'owner',
// deleteResource: 'owner',