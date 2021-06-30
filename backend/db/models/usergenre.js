'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usergenre = sequelize.define('Usergenre', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    genreId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Usergenre.associate = function(models) {
    // associations can be defined here
  };
  return Usergenre;
};