const sinon = require('sinon');
const { expect } = require('chai');
const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');

describe('chamada do controller getAllSales', () => {
  const request = {};
  const response = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(salesServices, 'getAll').resolves([]);
  });

  it('é retornado status 200', async () => {
    await salesControllers.getAllSales(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it ('é retornado json contendo um array', async () => {
    await salesControllers.getAllSales(request, response);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });

  after(() => {
    salesServices.getAll.restore();
  });
});

describe('chamada do controller getSalesById', () => {
  const request = {};
  const response = {};

  before(() => {
    request.params = { id: 1 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(salesServices, 'getById').resolves([]);
  });

  it('é retornado status 200', async () => {
    await salesControllers.getSalesById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it ('é retornado json contendo um objeto', async () => {
    await salesControllers.getSalesById(request, response);
    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });

  after(() => {
    salesServices.getById.restore();
  });
});
