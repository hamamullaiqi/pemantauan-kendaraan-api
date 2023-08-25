import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../../models";
import { sendEmail } from "../library/email/sendEmail";

export const register = async (req, res) => {
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
            const newUser = await user?.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                // role: req.body.role
            });

            const token = jwt.sign(
                { email: newUser.email },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );
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

export const login = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        app: Joi.string(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send({
            staus: "Invalid Input",
            message: error.details[0].message,
        });
    }

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

        console.log(req.body.password, userExist.password);
        const isValid = await bcrypt.compare(
            req.body.password,
            userExist.password
        );

        if (!isValid) {
            return res.status(400).send({
                status: "failed",
                message: "password invalid",
            });
        }

        const token = jwt.sign({ ...userExist }, process.env.SECRET_KEY);

        return res.status(200).send({
            status: "success",
            message: "Login Success",

            token,
            // user: {
            //     id: userExist.id,
            //     username: userExist.username,
            //     role: userExist.role,
            //     email: userExist.email,
            //     image: userExist?.image,
            //     token,
            // },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};

export const resfreshAuth = async (req, res) => {
    try {
        const id = req.user.id;

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
                message: "user tidak di temukan",
            });
        }

        res.send({
            status: "success...",
            data: { dataUser },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new Error("Invalid Email");
        }
        await sendEmail({
            email_address: email,
            template_name: "otp",
            data: { email },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};
