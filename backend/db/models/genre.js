'use strict';
module.exports = (sequelize, DataTypes) => {
  const genre = sequelize.define('genre', {
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  genre.associate = function(models) {
    genre.belongsToMany(models.user, {through: "usergenre", foreignKey: "genreId"})
  };
  return genre;
};