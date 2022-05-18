const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
} = require('../controllers/productsControllers');
const {
  getAllSales,
  getSalesById,
  createSale,
} = require('../controllers/salesControllers');

router.get('/products', rescue(getAllProducts));
router.get('/products/:id', rescue(getProductsById));
router.post('/products', rescue(createProduct));
router.put('/products/:id', rescue(updateProduct));

router.get('/sales', rescue(getAllSales));
router.get('/sales/:id', rescue(getSalesById));
router.post('/sales', rescue(createSale));

module.exports = router;
