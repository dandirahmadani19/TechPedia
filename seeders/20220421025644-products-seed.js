'use strict';
const fs = require("fs");

module.exports = {
   up (queryInterface, Sequelize) {
    const products = JSON.parse(fs.readFileSync("./data/products.json","utf-8")).map(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e;
    })
    return queryInterface.bulkInsert("Products", products, {});
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {});
  }
};

