'use strict';
const fs = require("fs");

module.exports = {
   up (queryInterface, Sequelize) {
    const users = JSON.parse(fs.readFileSync("./data/users.json","utf-8")).map(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e;
    })
    return queryInterface.bulkInsert("Users", users, {});
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};

