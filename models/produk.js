"use strict";
const { Model, UUIDV4 } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class produk extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            produk.hasMany(models.kendaraan_keluar, {
                as: "produkKeluar",
                foreignKey: {
                    name: "produk_id",
                },
            });

            produk.hasMany(models.kendaraan_masuk, {
                as: "produkMasuk",
                foreignKey: {
                    name: "produk_id",
                },
            });
        }
    }
    produk.init(
        {
            nama: DataTypes.STRING,
            keterangan: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "produk",
        }
    );
    produk.beforeCreate((produk) => (produk.id = uuid.v4()));
    return produk;
};
