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

const createProduct = async (req, res, _next) => {
  const newProduct = await productsServices.create(req.body);
  return res.status(201).json(newProduct);
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};
