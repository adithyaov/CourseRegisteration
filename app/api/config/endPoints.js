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
    ]
}


// {pattern: '/course/:id/join', method: 'post', target: 'chooseCourse'},
// {pattern: '/courses', method: 'get', target: 'displayCourses'},
// {pattern: '/groups', method: 'get', target: 'displayGroups'},
// {pattern: '/resource/:id', method: 'get', target: 'displayResource'},

// {pattern: '/user/:id/change-access', method: 'post', target: 'changeAccess'},
// {pattern: '/token/issue', method: 'post', target: 'issueToken'}

// {pattern: '/resource/update/:id', method: 'put', target: 'updateResource'},
// {pattern: '/resource/delete/:id', method: 'delete', target: 'deleteResource'},