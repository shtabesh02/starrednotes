'use strict';
const { Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.User, {
        through: models.Course_Enrollment,
        foreignKey: 'course_id',
        otherKey: 'user_id',
        onDelete: 'CASCADE'
      });

      Course.hasMany(models.Lesson, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE'
      });

      Course.hasMany(models.Course_Comment, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Course.init({
    title: DataTypes.STRING,
    instructor: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};