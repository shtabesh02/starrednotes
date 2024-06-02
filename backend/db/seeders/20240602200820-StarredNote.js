'use strict';
const {StarredNote} = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await StarredNote.bulkCreate([
    {
      user_id: 1,
      title: 'index.js in functional componenets direcotry',
      content: 'It specifies the default functional component to get accessed from other components.',
    },
    {
      user_id: 2,
      title: 'How to create a model',
      content: 'With this Sequelize command you can create your model: npx sequelize model:generate --name --attributes',
    }
   ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'StarredNotes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: {[Op.in]: [1, 2]}
    }, {})
  }
};
