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
      title: 'Associations',
      content: "In Sequelize, you can use associations to model the relationships listed above. The last column of the table shows how each relationship is represented in the database tables. You previously learned how Sequelize models are like blueprints for the tables in the relational database. Associations are basically Sequelize's way of telling the database about the connections or relationships between models, which in turn tells the database how to use things like foreign keys and join tables to properly store the data with those connections or relationships in place."
    },
    {
      user_id: 2,
      course_id: 2,
      title: 'Intro to JS',
      content: "In Sequelize, you can use associations to model the relationships listed above. The last column of the table shows how each relationship is represented in the database tables. You previously learned how Sequelize models are like blueprints for the tables in the relational database. Associations are basically Sequelize's way of telling the database about the connections or relationships between models, which in turn tells the database how to use things like foreign keys and join tables to properly store the data with those connections or relationships in place."
    },
    {
      user_id: 3,
      course_id: 3,
      title: 'Seeder',
      content: "In Sequelize, you can use associations to model the relationships listed above. The last column of the table shows how each relationship is represented in the database tables. You previously learned how Sequelize models are like blueprints for the tables in the relational database. Associations are basically Sequelize's way of telling the database about the connections or relationships between models, which in turn tells the database how to use things like foreign keys and join tables to properly store the data with those connections or relationships in place."
    },
    {
      user_id: 4,
      course_id: 4,
      title: 'Initializing Sequelize',
      content: "In Sequelize, you can use associations to model the relationships listed above. The last column of the table shows how each relationship is represented in the database tables. You previously learned how Sequelize models are like blueprints for the tables in the relational database. Associations are basically Sequelize's way of telling the database about the connections or relationships between models, which in turn tells the database how to use things like foreign keys and join tables to properly store the data with those connections or relationships in place."
    },
  ], {validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Lessons';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: {[Op.in]: ['Associations', 'Intro to JS', 'Seeder', 'Initializing Sequelize']}
    }, {})
  }
};
