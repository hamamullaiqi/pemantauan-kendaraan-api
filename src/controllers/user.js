import { createCrud } from "../utils/createCrud";
import getValidateInput from "../services/getValidateInput";
import { Op } from "sequelize";
import getValidateInputUser from "../services/getValidateInputUser";
const { user } = require("../../models");

const userCtrl = createCrud({
    models: user,
    option: (req, res) => {
        const { search, filters } = req.query;
        let toFilters;
        if (!!search || !!filters) {
            toFilters = {
                [Op.or]: [
                    { username: { [Op.like]: `%${search}%` } },
                    { fullname: { [Op.like]: `%${search}%` } },
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
    onBeforeSave: getValidateInputUser,
});
export default userCtrl;
