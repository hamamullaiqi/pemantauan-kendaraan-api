const { user } = require("../../models");

const Joi = require("joi");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
    // role: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    //time bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //validate user exits
    const userExist = await user.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userExist) {
      const newUser = await user.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        // role: req.body.role
      });

      const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY);
      res.status(201).send({
        status: "success",
        message: "Register Succeess",
        data: {
          user: {
            id: newUser.id,
            usernmae: newUser.username,
            role: newUser.role,
            token,
          },
        },
      });
    } else {
      return res.status(400).send({
        status: "failed",
        message: "User already exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await user.findOne({
      where: {
        username: req.body.username,
      },
      attributes: {
        exclude: ["createdAt", "updateAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "unregistered account",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "password invalid",
      });
    }

    const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      message: "Login Success",
      data: {
        user: {
          id: userExist.id,
          username: userExist.username,
          role: userExist.role,
          email: userExist.email,
          image: userExist?.image,
          token,
        },
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

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // data = JSON.parse(JSON.stringify(data));
    // console.log(data);

    // data = {
    //   ...data,
    //   image: process.env.FILE_PATH + data.image,
    // };

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success...",
      data: {dataUser}
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
