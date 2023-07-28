import Joi from "joi";

export default function getValidateInputTimbangan(body) {
  const schema = Joi.object({
    nama_supir: Joi.string().required(),
    produk_id: Joi.string().required(),
    vendor_id: Joi.string().required(),
    keterangan: Joi.string().allow(null, ""),
    gross: Joi.number().required(),
    tare: Joi.number().required(),
    nomer_polisi: Joi.string().required(),
  });
  const { error } = schema.validate(body);
  if (!!error) {
    throw Error(error.details[0].message);
  }
  return body;
}
