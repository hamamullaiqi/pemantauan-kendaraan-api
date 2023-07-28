"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class timbangan_kendaraan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            timbangan_kendaraan.belongsTo(models.kendaraan_masuk, {
                as: "kendaraanMasuk",
                foreignKey: {
                    name: "id_masuk",
                },
            });
            timbangan_kendaraan.belongsTo(models.kendaraan_keluar, {
                as: "kendaraanKeluar",
                foreignKey: {
                    name: "id_keluar",
                },
            });
        }
    }
    timbangan_kendaraan.init(
        {
            nomer_polisi: DataTypes.STRING,
            id_masuk: DataTypes.UUID,
            id_keluar: DataTypes.UUID,
        },
        {
            sequelize,
            modelName: "timbangan_kendaraan",
        }
    );
    timbangan_kendaraan.beforeCreate((item) => (item.id = uuid.v4()));
    return timbangan_kendaraan;
};
