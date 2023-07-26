import { createCrud } from "../utils/createCrud";
import getValidateInputVendor from "../services/getValidateInputVendor";
import { Op } from "sequelize";
import { Router } from "express";
const { vendor } = require("../../models");

<<<<<<< HEAD
const vendorCtrl = createCrud({
  models: vendor,
  option: (req, res) => ({
    attributes: {
      exclude: ["createdAt", "updatedAt", "id"],
    },
  }),
  onBeforeSave: getValidateInputVendor,
=======
let router = Router();

router = createCrud({
    models: vendor,
    option: (req, res) => {
        const { search, filters } = req.query;
        let toFilters;
        if (!!search || !!filters) {
            toFilters = {
                [Op.or]: [
                    { nama: { [Op.regexp]: search } },
                    { alamat: { [Op.regexp]: search } },
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
    onBeforeSave: getValidateInputVendor,
>>>>>>> bd770b768703f0a66138f4b35a1cf92eb4312093
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
        const data = await vendor.findAll(toFilters);
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
