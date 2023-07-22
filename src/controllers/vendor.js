import { createCrud } from "../utils/createCrud";
import getValidateInput from "../services/getValidateInput";
const { vendor } = require("../../models");

const vendorCtrl = createCrud({
    models: vendor,
    option: (req, res) => ({
        attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
        },
    }),
    onBeforeSave: getValidateInput,
});
export default vendorCtrl;
