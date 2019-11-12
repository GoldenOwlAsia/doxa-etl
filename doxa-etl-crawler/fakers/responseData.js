const faker = require('faker');

module.exports.generateOrder = () => {
  return {
    data: {
      order: {
        id: faker.random.uuid(),
        buyerId: faker.random.uuid(),
        orderNumber: faker.random.number().toString(),
        totalAmount: parseInt(faker.finance.amount()),
      }
    }
  };
}

module.exports.generateInvoice = () => {
  return {
    data: {
      invoice: {
        id: faker.random.uuid(),
        buyerId: faker.random.uuid(),
        invoiceNumber: faker.random.number().toString(),
        totalAmount: parseInt(faker.finance.amount()),
      }
    }
  };
}
