const { paging } = require("../controllers/utils");
const { user, tb_registrasi, tb_pembayaran } = require("../../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { date } = require("joi");

exports.AddPembayaran = async (req, res) => {
  try {
    let tanggal_pembayaran = new Date();
    const newData = ({ id_user, id_registrasi, nama_lengkap } = req.body);
    let data = await tb_pembayaran.create({
      bukti_pembayaran: req.file.filename,
      tanggal_pembayaran,
      ...newData,
    });

    // let dataAdd = await tb_pembayaran.findOne({
    //   where: {
    //     id: data.id,
    //   },
    //   include: [
    //     {
    //       model: user,
    //       as: "user",
    //     },
    //     {
    //       model: tb_registrasi,
    //       as: "registrasi",
    //     },
    //   ],
    // });

    data = JSON.parse(JSON.stringify(data));
    data = {
      ...data,
      bukti_pembayaran: process.env.FILE_PATH + data.bukti_pembayaran,
    };
    console.log(data);
    res.status(201).send({
      status: "success Add data",
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
