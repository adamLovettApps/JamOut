'use strict';
module.exports = (sequelize, DataTypes) => {
  const instrument = sequelize.define('instrument', {
    instrument: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  instrument.associate = function(models) {
    instrument.belongsToMany(models.user, {through: "userinstrument", foreignKey: "instrumentId"})
  };
  return instrument;
};