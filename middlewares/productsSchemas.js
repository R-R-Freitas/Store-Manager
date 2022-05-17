const Joi = require('joi');

const productKeysValidation = Joi.object({
  name: Joi.required(),
  quantity: Joi.required(),
});

const productValuesValidation = Joi.object({
  name: Joi.string().min(5),
  quantity: Joi.number().integer().min(1),
});

module.exports = {
  productKeysValidation,
  productValuesValidation,
};
