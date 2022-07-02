'use strict';
const bcrypt = require("bcrypt")


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     

    await queryInterface.bulkInsert("users", [{
      username: "admin",
      email: "admin@sdkaryabangsa.com",
      password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('users', null, {});

  }
};
