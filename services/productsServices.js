const productsModels = require('../models/productsModels');
const errorHandler = require('../middlewares/errorHandler');

const getAll = async () => {
  const modelResult = await productsModels.getAll();
  return modelResult;
};

const getById = async (id) => {
  const modelResult = await productsModels.getById(id);
  if (!modelResult) throw errorHandler(404, 'Product not found');
  return modelResult;
};

module.exports = { getAll, getById };
