import Joi from "joi";

export default function getValidateInput(body) {
    const schema = Joi.object({
        nama: Joi.string().required(),
        keterangan: Joi.string().allow(null, ""),
    });
    const { error } = schema.validate(body);
    if (!!error) {
        throw Error(error.details[0].message);
    }
    return body;
}
