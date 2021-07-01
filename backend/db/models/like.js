'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, {foreignKey: "id", as: "liker"})
    Like.belongsTo(models.User, {foreignKey: "id", as: "likee"})
  };
  return Like;
};