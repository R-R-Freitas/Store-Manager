const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('chamada do controller getAllProducts', () => {
  const request = {};
  const response = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getAll').resolves([]);
  });

  it('é retornado status 200', async () => {
    await productsControllers.getAllProducts(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it ('é retornado json contendo um array', async () => {
    await productsControllers.getAllProducts(request, response);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });

  after(() => {
    productsServices.getAll.restore();
  });
});

describe('chamada do controller getProductsById', () => {
  const request = {};
  const response = {};

  before(() => {
    request.params = { id: 1 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getById').resolves({});
  });

  it('é retornado status 200', async () => {
    await productsControllers.getProductsById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it ('é retornado json contendo um objeto', async () => {
    await productsControllers.getProductsById(request, response);
    expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
  });

  after(() => {
    productsServices.getById.restore();
  });
});
