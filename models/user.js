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
            user.hasMany(models.kendaraan_masuk, {
                as: "petugasMasuk",
                foreignKey: {
                    name: "petugas_id",
                },
            });
            user.hasMany(models.kendaraan_keluar, {
                as: "petugasKeluar",
                foreignKey: {
                    name: "petugas_id",
                },
            });
        }
    }
    user.init(
        {
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            full_name: DataTypes.STRING,
            level: DataTypes.NUMBER,
            email: DataTypes.STRING,
            no_telp: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "user",
        }
    );
    return user;
};
