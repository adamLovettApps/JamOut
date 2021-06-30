'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Conversation.associate = function(models) {
    Conversation.belongsTo(models.User, {foreignKey: "id", as: "user1"})
    Conversation.belongsTo(models.User, {foreignKey: "id", as: "user2"})
  };
  return Conversation;
};