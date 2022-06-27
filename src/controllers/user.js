const { user } = require("../../models");
const path = require("path");
const fs = require("fs");
const { paging } = require("./utils");
const { Op } = require("sequelize");

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let datauser = await user.findOne({
      where: { id },
      attributes : {
        exclude: ["password"]
      }
    });

    datauser = JSON.parse(JSON.stringify(datauser));

    datauser = {
      ...datauser,
      image: process.env.FILE_PATH + datauser.image,
    };

    res.status(200).send({
      status: "succes",
      message: "success get datauser by ID",
      data: { datauser },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.status(200).send({
      status: "Success get all data Users",
      data: { users },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Error Failed get users",
      message: "Undifend server error",
    });
  }
};

exports.getUsersAll = async (req, res) => {
  try {
    const { page, perPage, search } = req.query
    const filter = (search) => {
      let result = ""
      if (search !== undefined) {
        result = { where: { username: { [Op.like]: `%${search}%` } } }
      }
      return result
    }
    const data = await paging(user, page, perPage, filter(search))

    res.status(200).send({
      status: "Success get all data Users",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Error Failed get users",
      message: "Undifend server error",
    });
  }
};

// exports.addUser = async (req, res) => {
//   try {
//     await user.create(req.body);
//     res.status(200).send({
//       status: "Succes add user",
//       message: "Data has been created",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       status: "Error",
//       message: "Data not created because server Error",
//     });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let dataUser = await user.findOne({
      where: {
        id,
      },
    });

    if (dataUser.image !== null) {
      const replaceFile = (filePath) => {
        //menggabungkan direktori controller , uploads dan nama file Product

        filePath = path.join(__dirname, "../../uploads", filePath);
        fs.unlink(filePath, (err) => console.log(err));
      };

      replaceFile(dataUser.image);
    }

    let dataUpdate = {
      username: req.body.username,
      email: req.body.email,
      image: req.file.filename,
    };

    console.log(id);

    let data = await user.update(dataUpdate, {
      where: {
        id,
      },
      ...dataUpdate,
    });

    data = JSON.parse(JSON.stringify(data));
    console.log(data);

    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
    };

    res.status(200).send({
      status: "Success update all data Users",
      data: {
        data,
        // dataUpdate,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Error Failed update users",
      message: "Undifend server error",
    });
  }
};
