const { paging } = require("../controllers/utils");
const { tb_registrasi, user } = require("../../models");
const bcrypt = require("bcrypt");
const moment = require("moment");

exports.getAllRegistrasi = async (req, res) => {
  try {
    const data = await tb_registrasi.findAll();
    res.status(200).send({
      status: "success get All data",
      data: { data },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getRegistrasi = async (req, res) => {
  try {
    const { page, perPage, search } = req.query;
    const data = await paging(tb_registrasi, page, perPage, search);
    res.status(200).send({
      status: "success get data",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addRegistrasi = async (req, res) => {
  try {
    let tgl_registrasi = new Date();
    const newData = ({
      nama_lengkap,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      agama,
      alamat,
      nomer_hp,
    } = req.body);
    const data = await tb_registrasi.create({ tgl_registrasi, ...newData });

    const splitName = nama_lengkap.split(" ");
    const convertDate = moment(tanggal_lahir).format("DD/MMM/YYYY");
    const splitPass = convertDate.split("/");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      `${splitPass[0]}${splitPass[1]}${splitPass[2]}`,
      salt
    );

    const newUser = await user.create({
      username:
        splitName.length === 1
          ? `${splitName[0]}${splitPass[0]}`.toLowerCase()
          : `${splitName[0]}${splitName[1]}${splitPass[0]}`.toLowerCase(),
      password: hashedPassword,
      role: "siswa",
    });
    res.status(201).send({
      status: "success Add data",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
