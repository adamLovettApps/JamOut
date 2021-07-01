'use strict';
module.exports = (sequelize, DataTypes) => {
  const Userinstrument = sequelize.define('Userinstrument', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    InstrumentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Userinstrument.associate = function(models) {
    // associations can be defined here
  };
  return Userinstrument;
};