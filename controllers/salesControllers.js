const salesServices = require('../services/salesServices');

const getAllSales = async (_req, res, _next) => {
  const allSales = await salesServices.getAll();
  return res.status(200).json(allSales);
};

const getSalesById = async (req, res, _next) => {
  const { id } = req.params;
  const salesById = await salesServices.getById(parseInt(id, 10));
  return res.status(200).json(salesById);
};

module.exports = {
  getAllSales,
  getSalesById,
};
