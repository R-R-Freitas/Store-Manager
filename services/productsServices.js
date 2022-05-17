const productsModels = require('../models/productsModels');
const errorHandler = require('../middlewares/errorHandler');
const {
  productKeysValidation,
  productValuesValidation,
} = require('../middlewares/productsSchemas');

const getAll = async () => {
  const modelResult = await productsModels.getAll();
  return modelResult;
};

const getById = async (id) => {
  const modelResult = await productsModels.getById(id);
  if (!modelResult) throw errorHandler(404, 'Product not found');
  return modelResult;
};

const create = async (product) => {
  const missingKeys = productKeysValidation.validate(product);
  if (missingKeys.error) throw errorHandler(400, missingKeys.error.details[0].message);
  const invalidValues = productValuesValidation.validate(product);
  if (invalidValues.error) throw errorHandler(422, invalidValues.error.details[0].message);
  return product;
};

module.exports = { getAll, getById, create };
