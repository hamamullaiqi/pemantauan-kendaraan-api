import { createCrud } from "../utils/createCrud";
import getValidateInput from "../services/getValidateInput";
const { produk } = require("../../models");

const produkCtrl = createCrud({
    models: produk,
    option: {
        findOpt: {
            attributes: {
                exclude: ["createdAt", "updatedAt", "id"],
            },
        },
    },
    onBeforeSave: getValidateInput,
});
export default produkCtrl;
