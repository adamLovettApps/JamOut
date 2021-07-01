'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    ConversationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserIdTo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserIdFrom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
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

