import { createCrud } from "../utils/createCrud";
import getValidateInput from "../services/getValidateInput";
import { Op } from "sequelize";
import getValidateInputUser from "../services/getValidateInputUser";
const { user } = require("../../models");
import bcrypt from "bcrypt";

const userCtrl = createCrud({
    models: user,
    minLevel: 0x1ff0,
    onBeforeSave: async (body) => {
        getValidateInputUser(body);
        const { password, ...rest } = body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return { ...rest, password: hashedPassword };
    },
    option: (req, res) => {
        const { search, filters } = req.query;
        let toFilters;
        if (!!search || !!filters) {
            toFilters = {
                [Op.or]: [
                    { username: { [Op.regexp]: search } },
                    { full_name: { [Op.regexp]: search } },
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
    // onBeforeSave: getValidateInputUser,
});
export default userCtrl;
