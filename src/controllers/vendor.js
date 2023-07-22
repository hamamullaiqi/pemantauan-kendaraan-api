import { createCrud } from "../utils/createCrud";
import getValidateInputVendor from "../services/getValidateInputVendor";
const { vendor } = require("../../models");

const vendorCtrl = createCrud({
    models: vendor,
    option: (req, res) => ({
        attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
        },
    }),
    onBeforeSave: getValidateInputVendor,
});
export default vendorCtrl;
