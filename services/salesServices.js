const salesModels = require('../models/salesModels');
const { salesByIdNormalizer, salesAllNormalizer } = require('../middlewares/normalizers');
const errorHandler = require('../middlewares/errorHandler');

const getAll = async () => {
  const modelResult = await salesModels.getAll();
  const result = modelResult.map(salesAllNormalizer);
  return result;
};

const getById = async (id) => {
  const modelResult = await salesModels.getById(id);
  if (!modelResult || modelResult.length === 0) {
    throw errorHandler(404, 'Product not found');
  }
  const result = modelResult.map(salesByIdNormalizer);
  return result;
};

module.exports = { getAll, getById };
