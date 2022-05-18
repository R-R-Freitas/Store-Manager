const connection = require('../connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products;');

  return result;
};

const getById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?;', [id]);
  return result;
};

const getByName = async (name) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE name = ?;', [name]);
  return result;
};

const create = async (name, quantity) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);
  return { id: insertId, name, quantity };
};

const update = async (id, name, quantity) => {
  const [result] = await connection
    .execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?;', [name, quantity, id]);
  return result.affectedRows;
};

const deleteById = async (id) => {
  const [result] = await connection.execute('DELETE FROM products WHERE id = ?;', [id]);
  return result.affectedRows;
};

module.exports = { getAll, getById, getByName, create, update, deleteById };
