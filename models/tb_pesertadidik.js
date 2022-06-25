"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tb_pesertadidik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_pesertadidik.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "id",
        },
      });
      tb_pesertadidik.belongsTo(models.tb_registrasi, {
        as: "registrasi",
        foreignKey: {
          name: "id_registrasi",
        },
      });
    }
  }
  tb_pesertadidik.init(
    {
      id_user: DataTypes.INTEGER,
      id_registrasi: DataTypes.INTEGER,
      nama_lengkap: DataTypes.STRING,
      tanggal_lahir: DataTypes.DATE,
      agama: DataTypes.CHAR,
      alamat: DataTypes.TEXT,
      no_hp: DataTypes.CHAR,
    },
    {
      sequelize,
      modelName: "tb_pesertadidik",
    }
  );
  return tb_pesertadidik;
};
