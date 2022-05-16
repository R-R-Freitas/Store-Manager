const sinon = require('sinon');
const { expect } = require('chai');
const salesModels = require('../../../models/salesModels')
const salesServices = require('../../../services/salesServices');
const modelReturnAll = [
  {id: 1, date: '2022-02-28 12:05:56', product_id: 1, quantity: 5},
  {id: 1, date: '2022-02-28 12:05:56', product_id: 2, quantity: 10},
  {id: 2, date: '2022-02-28 12:05:56', product_id: 3, quantity: 15},
];
const modelReturnById = [
  {id: 1, date: '2022-02-28 12:05:56', product_id: 1, quantity: 5},
  {id: 1, date: '2022-02-28 12:05:56', product_id: 2, quantity: 10},
];
const modelReturnInvalid = [];


describe('Busca todas as vendas', () => {
  before(() => {
    sinon.stub(salesModels, 'getAll').resolves(modelReturnAll);
  });
  it ('retorna um objeto com as chaves esperadas', async() => {
    const result = await salesServices.getAll();
    expect(result).to.be.an('array');
    expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
  });
  after(() => {
    salesModels.getAll.restore();
  });
});

describe('Busca vendas pelo id do produto', () => {
  describe('Busca um id válido', () => {
    before(() => {
      sinon.stub(salesModels, 'getById').resolves(modelReturnById);
    });
    it ('retorna um array',
      async() => {
        const result = await salesServices.getById(1);
        expect(result).to.be.an('array');
    });
    it ('o retorno do service tem as keys esperadas', async() => {
      const result = await salesServices.getById(1);
      expect(result[0]).to.include.all.keys('date', 'productId', 'quantity');
    })
    after(() => {
      salesModels.getById.restore();
    });
  });
});
