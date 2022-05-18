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
  const { name, quantity } = product;
  const searchByName = await productsModels.getByName(name);
  if (searchByName) throw errorHandler(409, 'Product already exists');
  const modelResult = await productsModels.create(name, quantity);
  return modelResult;
};

const update = async (product) => {
  const { id, name, quantity } = product;
  const modelResult = await productsModels.update(id, name, quantity);
  if (!modelResult || modelResult < 1) throw errorHandler(404, 'Product not found');
  return { id, name, quantity };
};

module.exports = { getAll, getById, create, update };
