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

const create = async (sale) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (NOW());');
  sale.forEach(async (item) => {
    await connection
      .execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
        [insertId, item.productId, item.quantity],
      );
  });
  return insertId;
};

module.exports = { getAll, getById, create };
