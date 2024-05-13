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
        user_id: 2,
        title: 'SequelizeJS',
        instructor: 'Sharif Rezaie',
        category: 'Javascript',
        description: 'A detailed course on Sequelize JS'
      },
      {
        user_id: 2,
        title: 'ExpressJS',
        instructor: 'Alisina Danesh',
        category: 'Javascript',
        description: 'A detailed course on Express JS'
      },
      {
        user_id: 1,
        title: 'Flask',
        instructor: 'Mohammadjan Farasu',
        category: 'Python',
        description: 'A detailed course on Flask Python'
      }
    ], {validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Courses';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['SequelizeJS', 'ExpressJS', 'Flask'] }
    }, {});
  }
};
