const axios = require('axios');
const jsontoxml = require('jsontoxml');
const faker = require('faker');
const s3Helper = require('../utils/s3');

const fetchUrl = 'https://jsonplaceholder.typicode.com/todos';

exports.handler = async () => {
  try {
    // example for http request request
    const response = await axios.get(fetchUrl);
    const currentDate = new Date;

    // get and put order to s3
    const orderDataItem = {
      data: {
        order: {
          id: faker.random.uuid(),
          buyerId: faker.random.uuid(),
          orderNumber: faker.random.number().toString(),
          totalAmount: parseInt(faker.finance.amount()),
        }
      }
    }
    s3Helper.putS3({
      Bucket: process.env['BUCKET_NAME'],
      Key: `com01/orders/year=${currentDate.getFullYear()}/month=${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/day=${currentDate.getDate().toString().padStart(2, '0')}/order-${orderDataItem.data.order.id}.xml`,
      Body: `<?xml version="1.0" encoding="utf-8"?>${jsontoxml(orderDataItem)}`,
    });

    // get and put invoice to s3
    const invoiceDataItem = {
      data: {
        invoice: {
          id: faker.random.uuid(),
          buyerId: faker.random.uuid(),
          invoiceNumber: faker.random.number().toString(),
          totalAmount: parseInt(faker.finance.amount()),
        }
      }
    }
    s3Helper.putS3({
      Bucket: process.env['BUCKET_NAME'],
      Key: `com01/invoices/year=${currentDate.getFullYear()}/month=${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/day=${currentDate.getDate().toString().padStart(2, '0')}/invoice-${invoiceDataItem.data.invoice.id}.xml`,
      Body: `<?xml version="1.0" encoding="utf-8"?>${jsontoxml(invoiceDataItem)}`,
    });
  }
  catch(error) {
    throw error;
  }
}
