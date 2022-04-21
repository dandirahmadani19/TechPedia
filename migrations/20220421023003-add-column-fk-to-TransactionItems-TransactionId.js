'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn("TransactionItems", "TransactionId", {
      type: Sequelize.INTEGER,
        references: {
          model: 'Transactions',
          key: 'id'
        }
    })
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("TransactionItems", "TransactionId", {});
  }
};
