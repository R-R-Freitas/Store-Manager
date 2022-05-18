const salesModels = require('../models/salesModels');
const { salesByIdNormalizer, salesAllNormalizer } = require('../middlewares/normalizers');
const errorHandler = require('../middlewares/errorHandler');
const {
  salesKeysValidation,
  salesValuesValidation,
} = require('../middlewares/salesSchemas');

const getAll = async () => {
  const modelResult = await salesModels.getAll();
  const result = modelResult.map(salesAllNormalizer);
  return result;
};

const getById = async (id) => {
  const modelResult = await salesModels.getById(id);
  if (!modelResult || modelResult.length === 0) {
    throw errorHandler(404, 'Sale not found');
  }
  const result = modelResult.map(salesByIdNormalizer);
  return result;
};

const create = async (sale) => {
  sale.forEach((item) => {
    const missingKeys = salesKeysValidation.validate(item);
    if (missingKeys.error) throw errorHandler(400, missingKeys.error.details[0].message);
    const invalidValues = salesValuesValidation.validate(item);
    if (invalidValues.error) throw errorHandler(422, invalidValues.error.details[0].message);
  });
  const modelResult = await salesModels.create(sale);
  return { id: modelResult, itemsSold: sale };
};

module.exports = { getAll, getById, create };
