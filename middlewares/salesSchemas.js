const Joi = require('joi');

const salesKeysValidation = Joi.object({
  productId: Joi.required(),
  quantity: Joi.required(),
});

const salesValuesValidation = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1),
});

module.exports = {
  salesKeysValidation,
  salesValuesValidation,
};
