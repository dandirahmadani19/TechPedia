'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
const sendEmail = require("../helpers/sendEmail");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.Product);
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, option) {
        const salt = bcrypt.genSaltSync(6);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash;
      }
    },
    hooks: {
      afterCreate(instance) {
        sendEmail(instance.email, `Success Create New Account}`);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};