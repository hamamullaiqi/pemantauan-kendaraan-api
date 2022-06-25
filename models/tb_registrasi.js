"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tb_registrasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_registrasi.hasOne(models.tb_pembayaran, {
        as: "tb_pembayaran",
        foreignKey: {
          name: "id_registrasi",
        },
      });
    }
  }
  tb_registrasi.init(
    {
      tgl_registrasi: DataTypes.DATE,
      nama_lengkap: DataTypes.STRING,
      jenis_kelamin: {
        type: DataTypes.ENUM,
        values: ["laki-laki", "perempuan"],
        defaultValue: "laki-laki",
      },
      tempat_lahir: DataTypes.STRING,
      tanggal_lahir: DataTypes.DATE,
      agama: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      nomer_hp: DataTypes.STRING,
      createBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tb_registrasi",
    }
  );
  return tb_registrasi;
};
