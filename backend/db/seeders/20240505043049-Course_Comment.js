'use strict';

const { Course_Comment } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Course_Comment.bulkCreate([
      {
        user_id: 1,
        course_id: 1,
        comment: 'comment1'
      },
      {
        user_id: 2,
        course_id: 2,
        comment: 'comment2'
      },
      {
        user_id: 3,
        course_id: 3,
        comment: 'comment3'
      }
    ], {validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Course_Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      comment: { [Op.in]: ['comment1', 'comment2', 'comment3'] }
    }, {});
  }
};
