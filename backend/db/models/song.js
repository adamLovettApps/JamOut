'use strict';
module.exports = (sequelize, DataTypes) => {
  const song = sequelize.define('song', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    song: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  song.associate = function(models) {
    song.belongsTo(models.user, {foreignKey: "id"})
  };
  return song;
};