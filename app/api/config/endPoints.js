module.exports = {
    keysToConsider: ['pattern', 'method', 'target'],
    elements: [
        // For the sake of the coding world
        {pattern: '/hello', method: 'get', target: 'hello'},
        {pattern: '/user/create', method: 'post', target: 'createUser'},
        {pattern: '/user/:id', method: 'get', target: 'displayUser'},

        {pattern: '/resource/:id', method: 'get', target: 'displayResource'},

        {pattern: '/course/create', method: 'post', target: 'createCourse'},
        {pattern: '/group/create', method: 'post', target: 'createGroup'},

        {pattern: '/resource/update', method: 'put', target: 'updateResource'},
        {pattern: '/resource/delete', method: 'delete', target: 'deleteResource'},


        {pattern: '/course/join', method: 'post', target: 'chooseCourse'},
        {pattern: '/group/add-users', method: 'post', target: 'addUsersToGroup'},
        {pattern: '/group/add-courses', method: 'post', target: 'addCoursesToGroup'},

        {pattern: '/user/courses/:id', method: 'get', target: 'displayUserCourses'},
        {pattern: '/owner/courses/:id', method: 'get', target: 'displayOwnerCourses'},
        {pattern: '/owner/groups/:id', method: 'get', target: 'displayOwnerGroups'}
    ]
}


// {pattern: '/user/:id/change-access', method: 'post', target: 'changeAccess'},
// {pattern: '/token/issue', method: 'post', target: 'issueToken'}
