'use strict';
const {
  Model
} = require('sequelize');

const { options } = require('pg/lib/defaults');
const bcrypt = require("bcryptjs");
const sendEmail = require("../helpers/sendEmail");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.Product);
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'firstName Cannot be Null'
        },
        notEmpty: {
          msg: 'firstName is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'lastName Cannot be Null'
        },
        notEmpty: {
          msg: 'lastName is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email Cannot be Null'
        },
        notEmpty: {
          msg: 'email is required'
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password Cannot be Null'
        },
        notEmpty: {
          msg: 'password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'role Cannot be Null'
        },
        notEmpty: {
          msg: 'role is required'
        }
      }
    }
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