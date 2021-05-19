'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BotTracer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Chat, {foreignKey: 'chatId'});
      this.belongsTo(models.User, {foreignKey: 'userId'});
    }
  };
  BotTracer.init({
    command: DataTypes.STRING,
    params: DataTypes.STRING,
    message: DataTypes.TEXT,
    chatId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BotTracer',
  });
  return BotTracer;
};