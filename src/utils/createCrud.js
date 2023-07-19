import { Router } from "express";
import { paging } from "../controllers/utils";
import { Op } from "sequelize";

export const createCrud = ({ models, option, onBeforeSave }) => {
    const rtr = Router();
    rtr.get("/paging", async (req, res) => {
        try {
            const { page, perPage } = req.query;
            // let toFilters = {};
            // if (search || filters) {
            //     const searchRegEx = new RegExp(search);
            //     toFilters={...toFilters, where: {
            //         [Op.or]: []
            //     }}
            // }

            const opt = option(req, res);

            const data = await paging(models, page, perPage, undefined, opt);
            res.status(200).send({
                status: "Success",
                data: data,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: "failed",
                message: "Server Error",
            });
        }
    });

    rtr.post("/add", async (req, res) => {
        try {
            let body = req.body;
            if (!!onBeforeSave && typeof onBeforeSave === "function") {
                const newBody = onBeforeSave(body);
                if (!newBody) {
                    throw Error("Body Not Allow Empty");
                }
                body = newBody;
            }
            const data = await models.create(body);
            return res.status(201).send({
                status: "Add Success",
                data: data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                status: "Failed",
                message:
                    error?.parent?.sqlMessage ||
                    error.message ||
                    "Server Error",
            });
        }
    });
    rtr.patch("/edit/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            let exist = await models.findOne({
                where: {
                    id,
                },
            });

            if (!exist) {
                return res.status(404).send({
                    status: "Not Found",
                    message: "Not Found Record",
                });
            }
            const data = await models.update(body, {
                where: {
                    id,
                },
            });
            return res.status(200).send({
                status: "Update Success",
                data: data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                status: "failed",
                message: "Server Error",
            });
        }
    });

    rtr.delete("/delete/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            let exist = await models.findOne({
                where: {
                    id,
                },
            });

            if (!exist) {
                return res.status(404).send({
                    status: "Not Found",
                    message: "Not Found Record",
                });
            }
            const data = await models.destroy({
                where: {
                    id,
                },
            });
            return res.status(200).send({
                status: "Delete Success",
                data: data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                status: "failed",
                message: "Server Error",
            });
        }
    });

    return rtr;
};
