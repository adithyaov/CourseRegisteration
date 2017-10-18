/**
 * Group.js
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
    contact: {
      type: 'string',
      email: true,
      required: true
    },
    userList: {
      collection: 'user',
      via: 'groupList'
    },
    courseList: {
      collection: 'course',
      via: 'groupList',
      dominant: true
    },
    owner: {
      model: 'user',
      required: true,
    }
  }
};
