'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instrument = sequelize.define('Instrument', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Instrument.associate = function(models) {
    Instrument.belongsToMany(models.User, {through: "Userinstrument", foreignKey: "InstrumentId"})
  };
  return Instrument;
};