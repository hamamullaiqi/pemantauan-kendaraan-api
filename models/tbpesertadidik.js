'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbpesertadidik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbpesertadidik.init({
    id_registrasi: DataTypes.INTEGER,
    nama_lengkap: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    agama: DataTypes.CHAR,
    alamat: DataTypes.TEXT,
    no_hp: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'tbpesertadidik',
  });
  return tbpesertadidik;
};