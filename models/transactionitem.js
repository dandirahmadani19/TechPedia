'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionItem extends Model {
    totalPayment(quantity, price){
      return quantity * price
    }
    
    static associate(models) {
      // define association here
    }
  }
  TransactionItem.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    TransactionId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionItem',
  });
  return TransactionItem;
};