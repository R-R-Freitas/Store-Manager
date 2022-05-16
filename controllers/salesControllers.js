const salesServices = require('../services/salesServices');

const getAll = (req, res, _next) => {
  const allSales = await salesServices.getAll();
  return res.status(200).json(allSales);
};

const getById = (req, res, _next) => {
  const { id } = req.params;
  const salesById = await salesServices.getById(parseInt(id, 10));
  return res.status(200).json(salesById);
};
