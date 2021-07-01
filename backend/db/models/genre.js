'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Genre.associate = function(models) {
    Genre.belongsToMany(models.User, {through: "Usergenre", foreignKey: "GenreId"})
  };
  return Genre;
};