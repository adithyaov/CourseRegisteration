/**
 * User.js
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
    email: {
      type: 'string',
      required: true,
      unique: true,
      email: true
    },
    type: {
      type: 'string',
      enum: ['user', 'owner', 'admin'],
      required: true
    },
    groupList: {
      collection: 'group',
      via: 'userList',
      dominant: true
    },
    coursesOwned: {
      collection: 'course',
      via: 'owner'
    },
    groupsOwned: {
      collection: 'group',
      via: 'owner'
    }
  }
};
