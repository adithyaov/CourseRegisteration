module.exports = {
    types: {everyone: 0, user: 1, owner: 2, admin: 3},
    targetsToConsider: ['hello', 'chooseCourse', 'displayCourses'],
    accessTargets: {
        hello: 'everyone',
        chooseCourse: 'user',
        displayCourses: 'everyone'
    }
}