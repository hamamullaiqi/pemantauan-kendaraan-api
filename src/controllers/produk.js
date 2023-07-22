import { createCrud } from "../utils/createCrud";
import getValidateInput from "../services/getValidateInput";
import { Op } from "sequelize";
const { produk } = require("../../models");

const produkCtrl = createCrud({
    models: produk,
    option: (req, res) => {
        const { search, filters } = req.query;
        let toFilters;
        if (!!search || !!filters) {
            toFilters = {
                [Op.or]: [
                    { nama: { [Op.like]: `%${search}%` } },
                    { keterangan: { [Op.like]: `%${search}%` } },
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
export default produkCtrl;
