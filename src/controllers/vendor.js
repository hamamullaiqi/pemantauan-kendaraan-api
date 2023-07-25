import { createCrud } from "../utils/createCrud";
import getValidateInputVendor from "../services/getValidateInputVendor";
import { Op } from "sequelize";
const { vendor } = require("../../models");

const vendorCtrl = createCrud({
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
});
export default vendorCtrl;
