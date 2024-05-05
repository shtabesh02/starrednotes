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
        comment: 'This course is a must taken course1.'
      },
      {
        user_id: 2,
        course_id: 2,
        comment: 'This course is a must taken course2.'
      },
      {
        user_id: 3,
        course_id: 3,
        comment: 'This course is a must taken course3.'
      }
    ], {validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Course_Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
