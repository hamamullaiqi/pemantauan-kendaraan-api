import { Router } from "express";
import { paging } from "../controllers/utils";

export const createCrud = ({ models, option, onBeforeSave }) => {
    const rtr = Router();
    rtr.get("/paging", async (req, res) => {
        try {
            const { page, perPage, search } = req.query;

            const data = await paging(
                models,
                page,
                perPage,
                undefined,
                option?.findOpt
            );
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
                body = onBeforeSave(body) || body;
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
