'use strict';

const { Course } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Course.bulkCreate([
      {
        title: 'Sequelize JS',
        description: 'A detailed course on Sequelize JS'
      },
      {
        title: 'Express JS',
        description: 'A detailed course on Express JS'
      },
      {
        title: 'Flask',
        description: 'A detailed course on Flask Python'
      }
    ], {validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Courses';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['Sequelize JS', 'Express JS', 'Flask'] }
    }, {});
  }
};
