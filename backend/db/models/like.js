'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  like.associate = function(models) {
    like.belongsTo(models.user, {foreignKey: "id", as: "liker"})
    like.belongsTo(models.user, {foreignKey: "id", as: "likee"})
  };
  return like;
};