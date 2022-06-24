"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_pembayarans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      id_registrasi: {
        type: Sequelize.INTEGER,
        references: {
          model: "tb_registrasis",
          key: "id",
        },
      },
      nama_lengkap: {
        type: Sequelize.STRING,
      },
      tanggal_pembayaran: {
        type: Sequelize.DATE,
      },
      bukti_pembayaran: {
        type: Sequelize.STRING,
      },
      status_pembayaran: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_pembayarans");
  },
};
