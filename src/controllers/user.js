const { user } = require("../../models");
const path = require("path");
const fs = require("fs");

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await user.findOne({
      where: { id },
    });

    res.status(200).send({
      status: "succes",
      message: "success get data by ID",
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

    let updateAvatarProfile = await user.update(dataUpdate, {
      where: {
        id,
      },
      ...dataUpdate,
    });

    updateAvatarProfile = JSON.parse(JSON.stringify(updateAvatarProfile));

    updateAvatarProfile = {
      image: process.env.FILE_PATH + dataUpdate.image,
    };

    res.status(200).send({
      status: "Success update all data Users",
      data: {
        updateAvatarProfile,
        dataUpdate,
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
