"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class kendaraan_masuk extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            kendaraan_masuk.belongsTo(models.produk, {
                as: "produkKeluar",
                foreignKey: {
                    name: "produk_id",
                },
            });
            kendaraan_masuk.belongsTo(models.vendor, {
                as: "vendorMasuk",
                foreignKey: {
                    name: "vendor_id",
                },
            });

            kendaraan_masuk.belongsTo(models.user, {
                as: "petugasMasuk",
                foreignKey: {
                    name: "petugas_id",
                },
            });
        }
    }
    kendaraan_masuk.init(
        {
            nama_supir: DataTypes.STRING,
            produk_id: DataTypes.STRING,
            vendor_id: DataTypes.STRING,
            waktu_masuk: DataTypes.DATE,
            keterangan: DataTypes.STRING,
            gross: DataTypes.INTEGER,
            tare: DataTypes.INTEGER,
            nett: DataTypes.INTEGER,
            nomer_polisi: DataTypes.STRING,
            petugas_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "kendaraan_masuk",
        }
    );
    return kendaraan_masuk;
};
