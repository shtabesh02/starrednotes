'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Completedlesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Completedlesson.belongsTo(models.User, {
        foreignKey: 'user_id'
      })

      Completedlesson.belongsTo(models.Course, {
        foreignKey: 'course_id'
      })
    }
  }
  Completedlesson.init({
    user_id: DataTypes.INTEGER,
    lesson_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Completedlesson',
  });
  return Completedlesson;
};