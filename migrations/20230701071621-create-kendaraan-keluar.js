"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "kendaraan_keluars",
            {
                id: {
                    allowNull: false,
                    defaultValue: Sequelize.UUID,
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                nama_supir: {
                    type: Sequelize.STRING,
                },
                produk_id: {
                    type: Sequelize.STRING,
                },
                vendor_id: {
                    type: Sequelize.STRING,
                },
                waktu_keluar: {
                    type: Sequelize.DATE,
                },
                keterangan: {
                    type: Sequelize.STRING,
                },
                gross: {
                    type: Sequelize.INTEGER,
                },
                tare: {
                    type: Sequelize.INTEGER,
                },
                nett: {
                    type: Sequelize.INTEGER,
                },
                nomer_polisi: {
                    type: Sequelize.STRING,
                },
                petugas_id: {
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
                indexes: [{ fields: ["petugas_id", "produk_id", "vendor_id"] }],
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("kendaraan_keluars");
    },
};
