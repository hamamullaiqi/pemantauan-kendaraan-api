"use strict";
const bcrypt = require("bcrypt");
const uuid = require("uuid");
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert("users", [
            {
                id: uuid.v4(),
                username: "admin",
                email: "admin@admin.com",
                full_name: "admin",
                password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
                level: 0x1fff0,
                role: "ADM",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("users", null, {});
    },
};
