"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class vendor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            vendor.hasMany(models.kendaraan_keluar, {
                as: "vendorKeluar",
                foreignKey: {
                    name: "vendor_id",
                },
            });

            vendor.hasMany(models.kendaraan_masuk, {
                as: "vendorMasuk",
                foreignKey: {
                    name: "vendor_id",
                },
            });
        }
    }
    vendor.init(
        {
            nama: DataTypes.STRING,
            keterangan: DataTypes.STRING,
            alamat: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "vendor",
        }
    );
    return vendor;
};
