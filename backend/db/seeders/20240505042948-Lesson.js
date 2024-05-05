'use strict';
const {Lesson} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
  await Lesson.bulkCreate([
    {
      user_id: 1,
      course_id: 1,
      title: 'Model',
      content: 'Model will be explained here...'
    },
    {
      user_id: 2,
      course_id: 2,
      title: 'Migration',
      content: 'Migration will be explained here...'
    },
    {
      user_id: 3,
      course_id: 3,
      title: 'Seeder',
      content: 'Seeder will be explained here...'
    },
    {
      user_id: 1,
      course_id: 1,
      title: 'Initializing Sequelize',
      content: 'Sequelize will be explained here...'
    },
  ], {validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Lessons';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: {[Op.in]: ['Model', 'Migration', 'Seeder', 'Initializing Sequelize']}
    }, {})
  }
};
