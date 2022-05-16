const sinon = require('sinon');
const { expect } = require('chai');
const productsModels = require('../../../models/productsModels')
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
    expect(result).to.be.an('object');
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
    it ('retorna um objeto com as keys code com um número e uma key body com um objeto',
      async() => {
        const result = await productsServices.getById(1);
        expect(result).to.be.an('object');
        expect(result.code).to.be.a('number');
        expect(result.body).to.be.an('object');
    });
    it ('a key code tem o valor 200', async() => {
      const result = await productsServices.getById(1);
      expect(result.code).to.equal(200);
    });
    it ('a key body tem as keys esperadas', async() => {
      const result = await productsServices.getById(1);
      expect(result.body).to.include.all.keys('id', 'name', 'quantity');
    })
    after(() => {
      productsModels.getById.restore();
    });
  });

  describe('Busca um id inexistente', () => {
    before(() => {
      sinon.stub(productsModels, 'getById').resolves(modelResultInvalid);
    });
    it ('retorna um objeto com as keys code com um número e body com um objeto', async() => {
      const result = await productsServices.getById(4);
      expect(result).to.be.an('object');
      expect(result.code).to.be.a('number');
      expect(result.body).to.be.an('object');
    });
    it ('retorna a key code com o valor 404', async() => {
      const result = await productsServices.getById(4);
      expect(result.code).to.equal(404);
    });
    it ('retorna a key body com um objeto', async() => {
      const result = await productsServices.getById(4);
      expect(result.body).to.be.an('object');
    });
    after(() => {
      productsModels.getById.restore();
    });
  });
});
