'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn("TransactionItems", "ProductId", {
      type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
    })
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("TransactionItems", "ProductId", {});
  }
};
