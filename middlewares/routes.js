const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const {
  getAllProducts,
  getProductsById,
} = require('../controllers/productsControllers');
const {
  getAllSales,
  getSalesById,
} = require('../controllers/salesControllers');

router.get('/products', rescue(getAllProducts));
router.get('/products/:id', rescue(getProductsById));

router.get('/sales', rescue(getAllSales));
router.get('/sales/:id', rescue(getSalesById));

module.exports = router;
