const { paging } = require("../controllers/utils");
const { tb_registrasi, user, tb_pembayaran } = require("../../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { Op } = require("sequelize");

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

exports.getRegistrasiById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tb_registrasi.findOne({ where: { id } });
    res.status(200).send({
      status: "succes",
      message: `success get data by ${id}`,
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

exports.getRegistrasiReport = async (req, res) => {
  try {
    const { page, perPage, search, start, end } = req.query;
    const filter = (search, start, end) => {
    console.log(start, end);

      let result = "";
      if (start !== undefined || end !== undefined || search !== undefined) {
        result = {
          where: {
            nama_lengkap: { [Op.like]: `%${search}%` },
            tgl_registrasi: { [Op.between]: [`${start}`, `${end} 23:59`] }
          }
        }
      } 
      return result;
    };
    const data = await paging(tb_registrasi, page, perPage, filter(search, start, end));
    res.status(200).send({
      status: "succes",
      message: "success get data",
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

exports.getRegistrasi = async (req, res) => {
  try {
    const { page, perPage, search} = req.query;
    const filter = (search) => {


      let result = "";
      if (search !== undefined) {
        result = {
          where: {
            nama_lengkap: { [Op.like]: `%${search}%` },
          }
        }
      } 
      return result;
    };
    const data = await paging(tb_registrasi, page, perPage, filter(search));
    res.status(200).send({
      status: "succes",
      message: "success get data",
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
      createBy,
    } = req.body);
    const data = await tb_registrasi.create({ tgl_registrasi, ...newData });

    const userCreate = await user.findOne({ where: { id: data.createBy } });
    console.log(userCreate);

    if (userCreate.role === "admin") {
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

      console.log(newUser);

      await tb_pembayaran.create({
        id_user: newUser.id,
        id_registrasi: data.id,
      });
    } else {
      await tb_pembayaran.create({ id_user: createBy, id_registrasi: data.id });
    }

    res.status(201).send({
      status: "success",
      message: "Registrasi success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteRegistrasi = async (req, res) => {
  try {
    const { id } = req.params;
    const dataPembayaran = await tb_pembayaran.destroy({
      where: { id_registrasi: id },
    });
    const data = await tb_registrasi.destroy({ where: { id } });
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

exports.updateRegistrasi = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updateData = ({
      nama_lengkap,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      agama,
      alamat,
      nomer_hp,
      createBy,
    } = req.body);
    const data = await tb_registrasi.update(updateData, { where: { id } });

    res.status(201).send({
      status: "success",
      message: "success Update",
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
