'use strict';

const { Course_Enrollment } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Course_Enrollment.bulkCreate([
      {
        user_id: 1,
        course_id: 1
      },
      {
        user_id: 2,
        course_id: 2
      },
      {
        user_id: 3,
        course_id: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
