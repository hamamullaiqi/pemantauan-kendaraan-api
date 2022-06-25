"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.tb_pesertadidik, {
        as: "tb_pesertadidik",
        foreignKey: {
          name: "id",
        },
      });
      user.hasOne(models.tb_pembayaran, {
        as: "tb_pembayaran",
        foreignKey: {
          name: "id",
        },
      });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: "siswa",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
