'use strict';
module.exports = (sequelize, DataTypes) => {
  const conversation = sequelize.define('conversation', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  conversation.associate = function(models) {
    conversation.belongsTo(models.user, {foreignKey: "id", as: "user1"})
    conversation.belongsTo(models.user, {foreignKey: "id", as: "user2"})
  };
  return conversation;
};