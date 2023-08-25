import { createCrud } from "../utils/createCrud";
import { Op, where } from "sequelize";
import { Router } from "express";
import getValidateInputTimbangan from "../services/getValidateInputTimbangan";
import dayjs from "dayjs";
const {
    kendaraan_keluar,
    timbangan_kendaraan,
    vendor,
    produk,
    user,
} = require("../../models");

let router = Router();

router = createCrud({
    models: kendaraan_keluar,
    option: (req, res) => {
        let { search, filters } = req.query;
        if (!!filters) {
            filters = JSON.parse(filters);
        }
        console.log("filters", filters);
        let toFilters;
        if (!!search) {
            toFilters = {
                ...toFilters,
                [Op.or]: [
                    { nama_supir: { [Op.regexp]: search } },
                    { nomer_polisi: { [Op.regexp]: search } },
                ],
            };
        }
        if (!!filters?.date) {
            const [start, end] = filters?.date;
            const newStartDate = dayjs(start).startOf("day").format();
            const newEndDate = dayjs(end).endOf("day").format();
            console.log("date", newStartDate, newEndDate);
            toFilters = {
                ...toFilters,
                waktu_keluar: {
                    [Op.gte]: newStartDate,
                    [Op.lte]: newEndDate,
                },
            };
        }
        // console.log(searchRegEx);
        return {
            attributes: {
                exclude: ["petugas_id", "produk_id", "vendor_id"],
            },
            include: [
                {
                    model: vendor,
                    as: "vendorKeluar",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                    model: produk,
                    as: "produkKeluar",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                    model: user,
                    as: "petugasKeluar",
                    attributes: {
                        exclude: [
                            "createdAt",
                            "updatedAt",
                            "password",
                            "id",
                            "role",
                            "image",
                        ],
                    },
                },
            ],
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
            throw Error("invalid input kendaraan keluar");
        }
        const existData = await timbangan_kendaraan.findOne({
            where: { nomer_polisi },
        });
        if (!existData) {
            throw Error("kendaraan tidak pernah masuk");
        }

        await timbangan_kendaraan.update(
            { id_keluar: id },
            {
                where: {
                    nomer_polisi,
                },
            }
        );
    },
});

router.delete("/delete_keluar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let exist = await timbangan_kendaraan.findOne({
            where: {
                id_keluar: id,
            },
        });

        if (!exist) {
            return res.status(404).send({
                status: "Not Found",
                message: "Not Found Record",
            });
        }

        await kendaraan_keluar.destroy({
            where: {
                id,
            },
        });
        await timbangan_kendaraan.update(
            { id_keluar: null },
            {
                where: {
                    id: exist.id,
                },
            }
        );

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
