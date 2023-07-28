import { createCrud } from "../utils/createCrud";
import { Op } from "sequelize";
import { Router } from "express";
import getValidateInputTimbangan from "../services/getValidateInputTimbangan";
const {
    kendaraan_masuk,
    timbangan_kendaraan,
    kendaraan_keluar,
} = require("../../models");

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

router.delete("/delete_masuk/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let exist = await timbangan_kendaraan.findOne({
            where: {
                id_masuk: id,
            },
        });

        if (!exist) {
            return res.status(404).send({
                status: "Not Found",
                message: "Not Found Record",
            });
        }

        if (!!exist?.dataValues?.id_keluar) {
            await kendaraan_keluar.destroy({
                where: {
                    id: exist?.dataValues?.id_keluar,
                },
            });
        }
        await kendaraan_masuk.destroy({
            where: {
                id,
            },
        });
        await timbangan_kendaraan.destroy({
            where: {
                id: exist.id,
            },
        });

        return res.status(200).send({
            status: "success",
            // data: data,
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
