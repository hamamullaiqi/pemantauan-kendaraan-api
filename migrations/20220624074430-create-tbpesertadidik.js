"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbpesertadidiks", {
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
      jenis_kelamin: {
        type: Sequelize.ENUM,
        values: ["laki-laki", "perempuan"],
        defaultValue: "laki-laki",
      },
      tempat_lahir: {
        type: Sequelize.CHAR,
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
      },
      agama: {
        type: Sequelize.CHAR,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      no_hp: {
        type: Sequelize.CHAR,
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
    await queryInterface.dropTable("tbpesertadidiks");
  },
};
