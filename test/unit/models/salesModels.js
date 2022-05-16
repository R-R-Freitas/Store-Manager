const { expect } = require('chai');
const sinon = require('sinon');
const salesModels = require('../../../models/salesModels');
const connection = require('../../../connection');
const queryResultAll = [
  [
    {id: 1, date: '2022-02-28 12:05:56', product_id: 1, quantity: 5},
    {id: 1, date: '2022-02-28 12:05:56', product_id: 2, quantity: 10},
    {id: 2, date: '2022-02-28 12:05:56', product_id: 3, quantity: 15},
  ]
];
const queryResultId = [
    [
      {id: 1, date: '2022-02-28 12:05:56', product_id: 1, quantity: 5},
      {id: 1, date: '2022-02-28 12:05:56', product_id: 2, quantity: 10},
    ]
];
describe('Buscar todos as vendas', () => {
  describe('Retorna um array de objetos com os dados das vendas', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(queryResultAll);
    });

    it('retorna um array com 3 posições', async () => {
      const result = await salesModels.getAll();
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(3);
    });

    after(() => {
      connection.execute.restore();
    });
  });
});

describe('Buscar uma venda por id', () => {
  before(() => {
   sinon.stub(connection, 'execute').resolves(queryResultId);
  });

  it('retorna um array com 2 posições', async() => {
    const result = await salesModels.getById(1);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(2);
  });

  after(() => {
    connection.execute.restore();
  });
});
