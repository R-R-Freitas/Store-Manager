const salesByIdNormalizer = (sale) => {
  const { date, quantity } = sale;
  return {
    date,
    productId: sale.product_id,
    quantity,
  };
};

const salesAllNormalizer = (sale) => {
  const { id, date, quantity } = sale;
  return {
    id,
    date,
    productId: sale.product_id,
    quantity,
  };
};

module.exports = {
  salesByIdNormalizer,
  salesAllNormalizer,
};
