'use strict';
module.exports = (sequelize, DataTypes) => {
  const usergenre = sequelize.define('usergenre', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    genreId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  usergenre.associate = function(models) {
    // associations can be defined here
  };
  return usergenre;
};