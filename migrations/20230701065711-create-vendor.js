"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "vendors",
            {
                id: {
                    allowNull: false,
                    defaultValue: Sequelize.UUID,
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                nama: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                },
                keterangan: {
                    type: Sequelize.STRING,
                },
                address: {
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
        await queryInterface.dropTable("vendors");
    },
};
