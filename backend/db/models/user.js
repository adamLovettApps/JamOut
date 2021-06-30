'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          }
        }
      },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
    profilePhoto: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.GEOMETRY,
      allowNull: false
    }
  }, {});
  user.associate = function(models) {
    user.belongsToMany(models.genre, {through: "usergenre", foreignKey: "userId"})
    user.belongsToMany(models.instrument, {through: "userinstrument", foreignKey: "userId"})
    user.hasMany(models.song, {foreignKey: "userId"})
    user.hasMany(models.conversation, {foreignKey: "userId"})
    user.hasMany(models.conversation, {foreignKey: "userId2"})
    user.hasMany(models.like, {foreignKey: "userId"})
    user.hasMany(models.like, {foreignKey: "userId2"})
    user.hasMany(models.message, {foreignKey: "userIdTo"})
    user.hasMany(models.message, {foreignKey: "userIdFrom"})
  };
  return user;
};