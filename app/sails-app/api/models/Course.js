/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    code: {
      type: 'string',
      required: true,
      unique: true
    },
    instructor: {
      type: 'string',
      required: true
    },
    credits: {
      type: 'integer',
      required: true
    },
    contact: {
      type: 'string',
      email: true,
      required: true
    },
    groupList: {
      collection: 'group',
      via: 'courseList'
    },
    joinedUsers: {
      collection: 'user',
      via: 'joinedCourses'
    },
    owner: {
      model: 'user',
      required: true,
    }
  }

};
