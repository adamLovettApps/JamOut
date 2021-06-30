'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instrument = sequelize.define('Instrument', {
    Instrument: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Instrument.associate = function(models) {
    Instrument.belongsToMany(models.User, {through: "Userinstrument", foreignKey: "instrumentId"})
  };
  return Instrument;
};