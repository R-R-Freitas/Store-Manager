const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../models/productsModels');
const connection = require('../../../connection');
const execute = [
  [
    {id: 1, name: 'Martelo de Thor', quantity: 10},
    {id: 2, name: 'Martelo de Thor', quantity: 20},
    {id: 3, name: 'Martelo de Thor', quantity: 30},
  ]
];

describe('Buscar todos os produtos', () => {
  describe('Retorna um array de objetos com os dados do produto', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(execute);
    });

    it('retorna um array', async () => {
      const result = await productsModels.getAll();
      expect(result).to.be.an('array');
    });

    after(() => {
      connection.execute.restore();
    });
  });
});

describe('Buscar um produto por id', () => {
  beforeEach(() => {
   sinon.stub(connection, 'execute').resolves(execute);
  });

  it('retorna um objeto', async() => {
    const result = await productsModels.getById(1);
    expect(result).to.be.an('object');
  });

  after(() => {
    connection.execute.restore();
  });
});
