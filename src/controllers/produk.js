import { createCrud } from "../utils/createCrud";
import getValidateInput from "../services/getValidateInput";
import { Op } from "sequelize";
import { Router } from "express";
const { produk } = require("../../models");

let router = Router();

router = createCrud({
    models: produk,
    option: (req, res) => {
        const { search, filters } = req.query;
        let toFilters;
        if (!!search || !!filters) {
            toFilters = {
                [Op.or]: [
                    { nama: { [Op.regexp]: search } },
                    { keterangan: { [Op.regexp]: search } },
                ],
            };
        }
        // console.log(searchRegEx);
        return {
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            where: toFilters,
        };
    },
    onBeforeSave: getValidateInput,
});

router.get("/all", async (req, res) => {
    try {
        const { search } = req.query;
        console.log(search);
        let toFilters = { limit: 5 };
        if (!!search) {
            toFilters = {
                ...toFilters,
                where: {
                    [Op.or]: [
                        { nama: { [Op.regexp]: search } },
                        // { keterangan: { [Op.regexp]: search } },
                    ],
                },
            };
        }
        const data = await produk.findAll(toFilters);
        return res.status(200).send({
            status: "success",
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failed",
            message: error || "Server Error",
        });
    }
});
export default router;
