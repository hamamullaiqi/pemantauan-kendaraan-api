import Joi from "joi";
import { createCrud } from "../utils/createCrud";
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
    onBeforeSave: (body) => {
        const schema = Joi.object({
            nama: Joi.string().min(5).required(),
            keterangan: Joi.string(),
        });
        const { error } = schema.validate(body);
        if (!!error) {
            throw Error(error.details[0].message);
        }
    },
});
export default produkCtrl;
