'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_pembayaran.init({
    id_registrasi: DataTypes.STRING,
    nama_lengkap: DataTypes.STRING,
    tanggal_pembayaran: DataTypes.DATE,
    bukti_pembayaran: DataTypes.STRING,
    status_pembayaran:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    } 
  }, {
    sequelize,
    modelName: 'tb_pembayaran',
  });
  return tb_pembayaran;
};