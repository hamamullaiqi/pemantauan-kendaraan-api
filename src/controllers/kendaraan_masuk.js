import { createCrud } from "../utils/createCrud";
import { Op } from "sequelize";
import { Router } from "express";
import getValidateInputTimbangan from "../services/getValidateInputTimbangan";
const { kendaraan_masuk, timbangan_kendaraan } = require("../../models");

let router = Router();

router = createCrud({
    models: kendaraan_masuk,
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
    onBeforeSave: (body, req) => {
        getValidateInputTimbangan(body);
        const { tare, gross } = body;
        const { id: petugas_id } = req.user;
        const nett = parseInt(gross) - parseInt(tare);
        return {
            ...body,
            petugas_id,
            nett,
        };
    },
    onAfterSave: async (result) => {
        const { id, nomer_polisi } = result || { id: null, nomer_polisi: "" };
        if (!id) {
            throw Error("invalid input kendaraan masuk");
        }

        await timbangan_kendaraan.create({ id_masuk: id, nomer_polisi });
    },
});

export default router;
