"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "timbangan_kendaraans",
            {
                id: {
                    allowNull: false,
                    defaultValue: Sequelize.UUID,
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                nomer_polisi: {
                    type: Sequelize.STRING,
                },
                id_masuk: {
                    type: Sequelize.UUID,
                    references: {
                        model: "kendaraan_masuks",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                id_keluar: {
                    type: Sequelize.UUID,
                    references: {
                        model: "kendaraan_keluars",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
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
                indexes: [{ fields: ["id_keluar", "id_keluar"] }],
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("timbangan_kendaraans");
    },
};
