const sinon = require('sinon');
const { expect } = require('chai');
const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');
const modelResultAll = [
  {id: 1, name: 'Martelo de Thor', quantity: 10},
  {id: 2, name: 'Martelo de Thor', quantity: 20},
  {id: 3, name: 'Martelo de Thor', quantity: 30},
];
const modelResultById = {id: 1, name: 'Martelo de Thor', quantity: 10};
const modelResultInvalid = undefined;

describe('Busca todos os produtos', () => {
  before(() => {
    sinon.stub(productsModels, 'getAll').resolves(modelResultAll);
  });
  it ('retorna um array', async() => {
    const result = await productsServices.getAll();
    expect(result).to.be.an('array');
  });
  after(() => {
    productsModels.getAll.restore();
  });
});

describe('Busca um produto pelo id', () => {
  describe('Busca um id válido', () => {
    before(() => {
      sinon.stub(productsModels, 'getById').resolves(modelResultById);
    });
    it ('retorna um objeto',
      async() => {
        const result = await productsServices.getById(1);
        expect(result).to.be.an('object');
    });
    it ('o retorno do service tem as keys esperadas', async() => {
      const result = await productsServices.getById(1);
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    })
    after(() => {
      productsModels.getById.restore();
    });
  });

});
