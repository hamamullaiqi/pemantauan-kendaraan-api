"use strict";
const dayjs = require("dayjs");
const { Model } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class kendaraan_keluar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            kendaraan_keluar.hasOne(models.timbangan_kendaraan, {
                as: "kendaraanKeluar",
                foreignKey: "id_keluar",
            });
            kendaraan_keluar.belongsTo(models.produk, {
                as: "produkKeluar",
                foreignKey: "produk_id",
            });
            kendaraan_keluar.belongsTo(models.vendor, {
                as: "vendorKeluar",
                foreignKey: "vendor_id",
            });

            kendaraan_keluar.belongsTo(models.user, {
                as: "petugasKeluar",
                foreignKey: "petugas_id",
            });
        }
    }
    kendaraan_keluar.init(
        {
            nama_supir: DataTypes.STRING,
            produk_id: DataTypes.UUID,
            vendor_id: DataTypes.UUID,
            waktu_keluar: DataTypes.DATE,
            keterangan: DataTypes.STRING,
            gross: DataTypes.INTEGER,
            tare: DataTypes.INTEGER,
            nett: DataTypes.INTEGER,
            nomer_polisi: DataTypes.STRING,
            petugas_id: DataTypes.UUID,
        },
        {
            sequelize,
            modelName: "kendaraan_keluar",
        }
    );
    kendaraan_keluar.beforeCreate((item) => (item.id = uuid.v4()));
    kendaraan_keluar.beforeCreate((item) => (item.waktu_keluar = dayjs()));

    return kendaraan_keluar;
};
