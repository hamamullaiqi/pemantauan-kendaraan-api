"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "produks",
            {
                id: {
                    allowNull: false,
                    defaultValue: Sequelize.UUID,
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                nama: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                keterangan: {
                    type: Sequelize.STRING,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            },
            {
                indexes: [{ fields: ["nama"] }],
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("produks");
    },
};
