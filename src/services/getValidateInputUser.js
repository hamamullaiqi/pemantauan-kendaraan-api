import Joi from "joi";

export default function getValidateInputUser(body) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(8).required(),
        full_name: Joi.string().required(),
        level: Joi.number().required(),
        email: Joi.string().allow(null, ""),
        no_telp: Joi.string().allow(null, ""),
        image: Joi.string().allow(null, ""),
    });
    const { error } = schema.validate(body);
    if (!!error) {
        throw Error(error.details[0].message);
    }
    return body;
}
