const salesModel = require('../models/salesModel');
const { salesByIdNormalizer, salesAllNormalizer } = require('../middlewares/normalizers');
const errorHandler = require('../middlewares/errorHandler');

const newGetAll = (sale) => {
  const { id, date, quantity } = sale;
  return {
    id,
    date,
    productId: sale.product_id,
    quantity,
  };
};

const getAll = async () => {
  const modelResult = await salesModel.getAll();
  const result = modelResult.map(salesAllNormalizer);
  return result;
};

const newGetById = (sale) => {
  const { date, quantity } = sale;
  return {
    date,
    productId: sale.product_id,
    quantity,
  };
};

const getById = async (id) => {
  const modelResult = await salesModel.getById(id);
  if (!modelResult || modelResult.length === 0) {
    throw errorHandler(404, 'Product not found');
  }
  const result = modelResult.map(salesByIdNormalizer);
  return result;
};

module.exports = { getAll, getById };
