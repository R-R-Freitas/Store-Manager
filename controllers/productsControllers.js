const productsServices = require('../services/productsServices');

const getAll = (req, res, _next) => {
  const allProducts = await productsServices.getAll();
  return res.status(200).json(allProducts);
};

const getById = (req, res, _next) => {
  const { id } = req.params;
  const productById = await productsServices.getById(parseInt(id, 10));
  return res.status(200).json(productById);
};
