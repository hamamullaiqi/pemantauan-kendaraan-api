const { Op } = require("sequelize");
const { tb_pembayaran, tb_pesertadidik } = require("../../models");
const { tb_registrasi, user } = require("../../models");
const { paging } = require("./utils");
const path = require("path");
const fs = require("fs");

exports.addPembayaran = async (req, res) => {
  try {
    const tanggal_pembayaran = new Date();
    const newData = ({ id_user, id_registrasi, nama_lengkap } = req.body);
    const bukti_pembayaran = req.file.filename;
    let data = await tb_pembayaran.create({
      tanggal_pembayaran,
      bukti_pembayaran,
      ...newData,
    });

    res.send({
      status: "success",
      data: { data },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getPembayaran = async (req, res) => {
  try {
    const { page, perPage, search } = req.query;
    const filter = (search) => {
      let result;
      if (search !== undefined) {
        result = {
          include: [
            {
              model: tb_registrasi,
              as: "registrasi",
              where: { nama_lengkap: { [Op.like]: `%${search}%` } },
            },
          ],
        };
      } else {
        result = {
          include: [
            {
              model: tb_registrasi,
              as: "registrasi",
            },
          ],
        };
      }
      return result;
    };
    let data = await paging(tb_pembayaran, page, perPage, filter(search));
    const total = data.total;

    data = JSON.parse(JSON.stringify(data));
    data = data.data.map((item) => {
      return {
        ...item,
        bukti_pembayaran: process.env.FILE_PATH + item.bukti_pembayaran,
      };
    });
    // data = { ...data[0], bukti_pembayaran: process.env.FILE_PATH + data[0].bukti_pembayaran }

    res.status(200).send({
      status: "success",
      message: "success get All",
      data: { data, total },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getPembayaranById = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await tb_pembayaran.findOne({ where: { id_user: id } });

    data = JSON.parse(JSON.stringify(data));
    // data =  {
    //         ...data,
    //         bukti_pembayaran: process.env.FILE_PATH + data.bukti_pembayaran
    //     }

    // data = { ...data[0], bukti_pembayaran: process.env.FILE_PATH + data[0].bukti_pembayaran }

    res.status(200).send({
      status: "success",
      message: "success get All",
      data: { data },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updatePembayaran = async (req, res) => {
  try {
    const { id } = req.params;
    const tanggal_pembayaran = new Date();
    const updateData = ({ nama_lengkap } = req.body);
    const bukti_pembayaran = req.file.filename;

    const userData = await user.findOne({ where: { id } });

    if (userData?.role !== "siswa") {
      const data = await tb_pembayaran.update(
        { tanggal_pembayaran, bukti_pembayaran, ...updateData },
        { where: { id } }
      );
    } else {
      const data = await tb_pembayaran.update(
        { tanggal_pembayaran, bukti_pembayaran, ...updateData },
        { where: { id_user: id } }
      );
    }

    res.send({
      status: "success",
      data: { data },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.acceptPembayaran = async (req, res) => {
  try {
    const { id } = req.params;
    const tanggal_pembayaran = new Date();

    const dataPembayaran = await tb_pembayaran.update(
      { tanggal_pembayaran, status_pembayaran: 1 },
      { where: { id } }
    );

    const getDataPembayaran = await tb_pembayaran.findOne({where: {id}})

    const dataRegistrasi = await tb_registrasi.findOne({
      where: { id: getDataPembayaran.id_registrasi },
    });

    
    const dataAddPesertaDidik = await tb_pesertadidik.create({
      id_user: getDataPembayaran.id_user,
      id_registrasi: getDataPembayaran.id_registrasi,
      nama_lengkap: dataRegistrasi.nama_lengkap,
      jenis_kelamin: dataRegistrasi.jenis_kelamin,
      tempat_lahir: dataRegistrasi.tempat_lahir,
      agama : dataRegistrasi.agama,
      alamat: dataRegistrasi.alamat,
      no_hp: dataRegistrasi.no_hp
    });

    console.log(dataAddPesertaDidik);
    res.send({
      status: "success",
      data: { dataPembayaran, dataAddPesertaDidik },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deletePembayaran = async (req, res) => {
  try {
    const { id } = req.params;
    const findData = await tb_pembayaran.findOne({ where: { id } });

    if (findData.bukti_pembayaran !== null) {
      const deleteFIle = (filePath) => {
        //menggabungkan direktori controller , uploads dan nama file Product
        filePath = path.join(__dirname, "../../uploads", filePath);
        fs.unlink(filePath, (err) => console.log(err));
      };
      deleteFIle(findData.bukti_pembayaran);
    }
    const dataPembayaran = await tb_pembayaran.destroy({ where: { id } });
    // const data = await tb_registrasi.destroy({ where: { id } })
    res.send({
      status: "success",
      message: `Success Delete data id: ${id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
