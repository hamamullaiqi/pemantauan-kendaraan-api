import Joi from "joi";

export default function getValidateInputUser(body) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(8).required(),
        full_name: Joi.string().required(),
        level: Joi.string().required(),
        email: Joi.string(),
        no_telp: Joi.string(),
        image: Joi.string(),
    });
    const { error } = schema.validate(body);
    if (!!error) {
        throw Error(error.details[0].message);
    }
    return body;
}
