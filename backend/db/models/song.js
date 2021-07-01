'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, {foreignKey: "id"})
  };
  return Song;
};