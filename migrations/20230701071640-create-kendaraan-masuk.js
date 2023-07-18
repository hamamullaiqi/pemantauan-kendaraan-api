"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "kendaraan_masuks",
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
                    type: Sequelize.UUID,
                    references: {
                        model: "produks",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                vendor_id: {
                    type: Sequelize.UUID,
                    references: {
                        model: "vendors",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                waktu_masuk: {
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
                    type: Sequelize.UUID,
                    references: {
                        model: "users",
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
                indexes: [{ fields: ["petugas_id", "produk_id", "vendor_id"] }],
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("kendaraan_masuks");
    },
};
