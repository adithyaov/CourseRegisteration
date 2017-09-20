module.exports = {
    types: {everyone: 0, user: 1, owner: 2, admin: 3},
    targetsToConsider: ['hello', 'chooseCourse', 'displayCourses',
                        'displayResource', 'createCourse', 'createGroup',
                        'chooseCourse', 'addUsersToGroup', 'addCoursesToGroup',
                        'displayUserCourses', 'displayOwnerCourses', 'displayOwnerGroups'],
    accessTargets: {
        hello: 'everyone',
        createUser: 'everyone',
        displayUser: 'everyone',

        displayResource: 'everyone',

        createGroup: 'owner',
        createCourse: 'owner',

        updateResource: 'owner',
        deleteResource: 'owner',

        chooseCourse: 'user',
        addUsersToGroup: 'owner',
        addCoursesToGroup: 'owner',

        displayUserCourses: 'everyone',
        displayOwnerCourses: 'everyone',
        displayOwnerGroups: 'everyone'
    }
}
