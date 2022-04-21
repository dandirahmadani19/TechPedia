'use strict';
const fs = require("fs");

module.exports = {
   up (queryInterface, Sequelize) {
    const categories = JSON.parse(fs.readFileSync("./data/categories.json","utf-8")).map(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e;
    })
    return queryInterface.bulkInsert("Categories", categories, {});
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  }
};

