'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
   
    static associate(models) {
      Product.belongsTo(models.User);
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.Transaction, { through: "TransactionItems" });
    }

    static detailProduk(id) {
      return Product.findByPk(id);
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name Cannot be Null'
        },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description Cannot be Null'
        },
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price Cannot be Null'
        },
        notEmpty: {
          msg: 'Price is required'
        },
        min: {
          args: 1000,
          msg: 'Minimum input 1000'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId Cannot be Null'
        },
        notEmpty: {
          msg: 'UserId is required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'CategoryId Cannot be Null'
        },
        notEmpty: {
          msg: 'CategoryId is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stock Cannot be Null'
        },
        notEmpty: {
          msg: 'Stock is required'
        }
      }
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Brand Cannot be Null'
        },
        notEmpty: {
          msg: 'Brand is required'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stock Cannot be Null'
        },
        notEmpty: {
          msg: 'Stock is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};