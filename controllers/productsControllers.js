const productsServices = require('../services/productsServices');

const getAllProducts = async (_req, res, _next) => {
  const allProducts = await productsServices.getAll();
  return res.status(200).json(allProducts);
};

const getProductsById = async (req, res, _next) => {
  const { id } = req.params;
  const productById = await productsServices.getById(parseInt(id, 10));
  return res.status(200).json(productById);
};

module.exports = {
  getAllProducts,
  getProductsById,
};
