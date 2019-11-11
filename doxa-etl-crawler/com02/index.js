import * as axios from 'axios';
import * as jsontoxml from 'jsontoxml';
import * as faker from 'faker';
import { putS3 } from '../utils/s3';

const fetchUrl = 'https://jsonplaceholder.typicode.com/todos';

exports.handler = async () => {
  try {
    // example for http request request
    const response = await axios.get(fetchUrl);

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
    putS3({
      Bucket: process.env['BUCKET_NAME'],
      Key: `com02/orders/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}/order-${orderDataItem.data.order.id}.xml`,
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
    putS3({
      Bucket: process.env['BUCKET_NAME'],
      Key: `com02/invoices/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}/invoice-${invoiceDataItem.data.invoice.id}.xml`,
      Body: `<?xml version="1.0" encoding="utf-8"?>${jsontoxml(invoiceDataItem)}`,
    });
  }
  catch(error) {
    throw error;
  }
}
