"use strict";

/** @type {import('sequelize-cli').Migration} */
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

        await queryInterface.bulkInsert("produks", [
            {
                id: uuid.v4(),
                nama: "nugget1",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget2",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget3",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget4",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget5",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget6",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget7",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget8",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget9",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget10",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget11",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget12",
                keterangan: "exampel",
            },
            {
                id: uuid.v4(),
                nama: "nugget13",
                keterangan: "exampel",
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
    },
};
