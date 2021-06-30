'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
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
  Message.associate = function(models) {
    Message.belongsTo(models.Conversation, {foreignKey: "id"})
    Message.belongsTo(models.User, {foreignKey: "id", as: "to"})
    Message.belongsTo(models.User, {foreignKey: "id", as: "from"})
  };
  return Message;
};

