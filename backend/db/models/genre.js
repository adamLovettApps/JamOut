'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    Genre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Genre.associate = function(models) {
    Genre.belongsToMany(models.User, {through: "Usergenre", foreignKey: "genreId"})
  };
  return Genre;
};