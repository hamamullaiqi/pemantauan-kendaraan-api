"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_pesertadidiks", {
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
        type: Sequelize.STRING,
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
      nomer_hp: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_pesertadidiks");
  },
};
