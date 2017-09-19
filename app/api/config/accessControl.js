module.exports = {
    types: {everyone: 0, user: 1, owner: 2, admin: 3},
    targetsToConsider: ['hello', 'chooseCourse', 'displayCourses',
                        'displayResource', 'createCourse', 'createGroup',
                        'chooseCourse'],
    accessTargets: {
        hello: 'everyone',
        createUser: 'everyone',
        displayUser: 'everyone',

        displayResource: 'everyone',

        createGroup: 'owner',
        createCourse: 'owner',

        chooseCourse: 'user',
    }
}

// updateResource: 'owner',
// deleteResource: 'owner',