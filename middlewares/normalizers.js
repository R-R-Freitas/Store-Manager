const salesByIdNormalizer = (sale) => {
  const { date, quantity } = sale;
  return {
    date,
    productId: sale.product_id,
    quantity,
  };
};

const salesAllNormalizer = (sale) => {
  const { date, quantity } = sale;
  return {
    saleId: sale.id,
    date,
    productId: sale.product_id,
    quantity,
  };
};

module.exports = {
  salesByIdNormalizer,
  salesAllNormalizer,
};
