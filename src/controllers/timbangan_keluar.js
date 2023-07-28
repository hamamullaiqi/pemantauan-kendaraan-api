import { createCrud } from "../utils/createCrud";
import getValidateInput from "../services/getValidateInput";
import { Op } from "sequelize";
import { Router } from "express";
const { timbangan_kendaraan } = require("../../models");

let router = Router();

router = createCrud({
    models: timbangan_kendaraan,
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
        return {
            attributes: {
                exclude: ["createdAt", "updatedAt", "id_masuk"],
            },
            where: toFilters,
        };
    },
    // onBeforeSave: getValidateInput,
});

export default router;
