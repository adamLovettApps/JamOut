'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      hashedpassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
    profilephoto: {
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
    lat: {
      type: DataTypes.FLOAT,
    },
    lng: {
      type: DataTypes.FLOAT,
    },
    location: {
      type: DataTypes.GEOGRAPHY,
    }
  },
  {
      defaultScope: {
        attributes: {
          exclude: ['hashedpassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedpassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  
  
  , {});
  User.associate = function(models) {
    User.belongsToMany(models.Genre, {through: "Usergenre", foreignKey: "UserId"})
    User.belongsToMany(models.Instrument, {through: "Userinstrument", foreignKey: "UserId"})
    User.hasMany(models.Song, {foreignKey: "UserId"})
    User.hasMany(models.Conversation, {foreignKey: "UserId" })
    User.hasMany(models.Conversation, {foreignKey: "UserId2" })
    User.hasMany(models.Like, {foreignKey: "UserId"})
    User.hasMany(models.Like, {foreignKey: "UserId2", as: "likee"})
    User.hasMany(models.Message, {foreignKey: "UserIdTo"})
    User.hasMany(models.Message, {foreignKey: "UserIdFrom"})
  };
  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedpassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ email, username, password, profilephoto, city, state, zip, bio, lat, lng  }) {
    const hashedpassword = bcrypt.hashSync(password);
    const user = await User.create({
      email, username, hashedpassword, profilephoto, city, state, zip, bio, lat, lng
    });
    return await User.scope('currentUser').findByPk(user.id,  {raw: true,});
  };
  return User;
};