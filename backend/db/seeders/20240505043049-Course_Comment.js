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
        comment: 'This is the best course available on planet earth.'
      },
      {
        user_id: 1,
        course_id: 1,
        comment: 'This is a single course sufficient to learn this technology'
      },
      {
        user_id: 2,
        course_id: 1,
        comment: 'Human beings needed this course.'
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
      user_id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
