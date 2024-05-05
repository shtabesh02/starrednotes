'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course_Enrollment.init({
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    enrolled_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Course_Enrollment',
  });
  return Course_Enrollment;
};