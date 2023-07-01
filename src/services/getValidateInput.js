import Joi from "joi";

export default function getValidateInput(body) {
    const schema = Joi.object({
        nama: Joi.string().min(5).required(),
        keterangan: Joi.string(),
    });
    const { error } = schema.validate(body);
    if (!!error) {
        throw Error(error.details[0].message);
    }
    return body;
}
