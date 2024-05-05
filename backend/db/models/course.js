'use strict';
const {
  Model
} = require('sequelize');
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
        otherKey: 'user_id'
      });

      Course.hasMany(models.Lesson, {
        foreignKey: 'course_id',
        onDelete: 'cascade'
      });

      Course.hasMany(models.Course_Comment, {
        foreignKey: 'course_id',
        onDelete: 'cascade'
      })
    }
  }
  Course.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};