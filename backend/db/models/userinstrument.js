'use strict';
module.exports = (sequelize, DataTypes) => {
  const Userinstrument = sequelize.define('Userinstrument', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    instrumentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Userinstrument.associate = function(models) {
    // associations can be defined here
  };
  return Userinstrument;
};