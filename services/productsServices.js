const productsModel = require('../models/productsModels');
const errorHandler = require('../middlewares/errorHandler');

const getAll = async () => {
  const modelResult = await productsModel.getAll();
  return { code: 200, body: modelResult };
};

const getById = async (id) => {
  const modelResult = await productsModel.getById(id);
  if (!modelResult) throw errorHandler(404, 'Product not found');
  return modelResult;
};

module.exports = { getAll, getById };
