'use strict';
module.exports = (sequelize, DataTypes) => {
  const userinstrument = sequelize.define('userinstrument', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    instrumentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  userinstrument.associate = function(models) {
    // associations can be defined here
  };
  return userinstrument;
};