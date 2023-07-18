"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class kendaraan_keluar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
    return kendaraan_keluar;
};
