'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unreadUser1: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    unreadUser2: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    newConversationUser1: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    newConversationUser2: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Conversation.associate = function(models) {
    Conversation.belongsTo(models.User, {foreignKey: "id", as: "user1"})
    Conversation.belongsTo(models.User, {foreignKey: "id", as: "user2"})
    Conversation.hasMany(models.Message, {foreignKey: "ConversationId"})
  };
  return Conversation;
};