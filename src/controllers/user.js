const { user } = require("../../models");
const path = require("path");
const fs = require("fs");
const { paging } = require("./utils");
const { Op } = require("sequelize");
const Joi = require("joi");
const bcrypt = require("bcrypt");


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let datauser = await user.findOne({
      where: { id },
      attributes: {
        exclude: ["password"]
      }
    });


    console.log(datauser.image);

    if(datauser.image !== null) {
    datauser = JSON.parse(JSON.stringify(datauser));

      datauser = {
        ...datauser,
        image: process.env.FILE_PATH + datauser.image,
      };
    }

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

exports.addUser = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newData = { username, email, role } = req.body
    const data = await user.create({ ...newData, password: hashedPassword });

    res.status(201).send({
      status: "Succes add user",
      message: "Data has been created",
      data: { data }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Error",
      message: "Data not created because server Error",
    });
  }
};

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
    res.status(500).send({
      status: "Error Failed update users",
      message: "Undifend server error",
    });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const data = await user.destroy({ where: { id } })

    res.status(200).send({
      status: "success",
      message: "success delete user",
      data: {data}
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Error",
      message: "Data not created because server Error",
    });
  }
}
