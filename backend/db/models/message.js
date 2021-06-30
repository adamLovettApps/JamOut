'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userIdTo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userIdFrom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  message.associate = function(models) {
    message.belongsTo(models.conversation, {foreignKey: "id"})
    message.belongsTo(models.user, {foreignKey: "id", as: "to"})
    message.belongsTo(models.user, {foreignKey: "id", as: "from"})
  };
  return message;
};