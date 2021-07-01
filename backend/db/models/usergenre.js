'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usergenre = sequelize.define('Usergenre', {
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    GenreId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Usergenre.associate = function(models) {
    // associations can be defined here
  };
  return Usergenre;
};