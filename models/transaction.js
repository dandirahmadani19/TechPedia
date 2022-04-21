'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    
    static associate(models) {
      Transaction.belongsTo(models.User);
      Transaction.belongsToMany(models.Product, { through: "TransactionItems" });
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    totalPayment: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};