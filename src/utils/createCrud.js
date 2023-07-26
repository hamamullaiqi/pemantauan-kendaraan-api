import { Router } from "express";
import { paging } from "../controllers/utils";
import { Op } from "sequelize";

export const createCrud = ({ models, option, onBeforeSave, minLevel }) => {
    const rtr = Router();
    rtr.get("/paging", async (req, res) => {
        try {
            const { page, perPage } = req.query;
            const { level } = req.user;
            if (!!minLevel && (minLevel & level) < 0) {
                throw Error("Error Privilage");
            }
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
                message: error || "Server Error",
            });
        }
    });

    rtr.post("/add", async (req, res) => {
        try {
            const { level } = req.user;
            if (!!minLevel && (minLevel & level) < 0) {
                throw Error("Error Privilage");
            }
            let body = req.body;
            if (!!onBeforeSave && typeof onBeforeSave === "function") {
                const newBody = await onBeforeSave(body, req, res);
                if (!newBody) {
                    throw Error("Body Not Allow Empty");
                }
                body = newBody;
            }
            await models.create(body);
            return res.status(201).send({
                status: "success",
                // data: data,
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
            const { level } = req.user;
            if (!!minLevel && (minLevel & level) < 0) {
                throw Error("Error Privilage");
            }
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
            console.log(body);
            const data = await models.update(body, {
                where: {
                    id,
                },
            });
            return res.status(200).send({
                status: "success",
                data: data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                status: "failed",
                message: error || "Server Error",
            });
        }
    });

    rtr.delete("/delete/:id", async (req, res) => {
        try {
            const { level } = req.user;
            if (!!minLevel && (minLevel & level) < 0) {
                throw Error("Error Privilage");
            }
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
                status: "success",
                data: data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                status: "failed",
                message: error || "Server Error",
            });
        }
    });

    return rtr;
};
