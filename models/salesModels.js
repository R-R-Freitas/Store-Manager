const connection = require('../connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT
        s.id, s.date, sp.product_id, sp.quantity
    FROM
        sales_products sp
            INNER JOIN
        sales s ON sp.sale_id = s.id
    GROUP BY sp.sale_id , sp.product_id , sp.quantity;`,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
        s.id, s.date, sp.product_id, sp.quantity
    FROM
        sales_products sp
            INNER JOIN
        sales s ON sp.sale_id = s.id
    WHERE
        sp.sale_id = ?
    GROUP BY sp.sale_id , sp.product_id , sp.quantity;`, [id],
  );
  return result;
};

module.exports = { getAll, getById };
