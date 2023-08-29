import { createCrud } from "../utils/createCrud";
import getValidateInputUser from "../services/getValidateInputUser";
import { Op } from "sequelize";
const { user } = require("../../models");
import { hasPassword } from "../services/users";

const userCtrl = createCrud({
    models: user,
    minLevel: 0x1ff0,
    onBeforeSave: async (body) => {
        getValidateInputUser(body);
        const { password, ...rest } = body;
        const hasedPassord = await hasPassword(password);
        return { ...rest, password: hasedPassord };
    },
    onBeforeUpdate: async (body) => {
        getValidateInputUser(body);
        const { password, ...rest } = body;
        const hasedPassord = await hasPassword(password);
        return { ...rest, password: hasedPassord };
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
                exclude: ["createdAt", "updatedAt", "password"],
            },
            where: toFilters,
        };
    },
    // onBeforeSave: getValidateInputUser,
});
export default userCtrl;
