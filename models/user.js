'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');
const { options } = require('pg/lib/defaults');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, {
        foreignKey: "UserId"
      })
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
      beforeCreate: (instance, options) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt)

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};