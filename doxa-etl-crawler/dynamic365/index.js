const axios = require('axios');
const jsontoxml = require('jsontoxml');
const faker = require('faker');

const s3Service = require('../services/s3');
const responseDataFaker = require('../fakers/responseData');

const companyName = process.env['COMPANY_NAME'];
const bucketName = process.env['BUCKET_NAME'];
const apiEndpoint = process.env['API_ENDPOINT'];
const apiType = process.env['API_TYPE'];

const crawOrder = () => {
  const orderDataItem = responseDataFaker.generateOrder();
  const orderS3Key = s3Service.generateBucketKey(companyName, 'orders', `order-${orderDataItem.data.order.id}.xml`);
  const orderS3Body = `<?xml version="1.0" encoding="utf-8"?>${jsontoxml(orderDataItem)}`;

  return s3Service.putS3({ Bucket: bucketName, Key: orderS3Key, Body: orderS3Body });
}

const crawInvoice = () => {
  const invoiceDataItem = responseDataFaker.generateInvoice();
  const invoiceS3Key = s3Service.generateBucketKey(companyName, 'invoices', `invoice-${invoiceDataItem.data.invoice.id}.xml`);
  const invoiceS3Body = `<?xml version="1.0" encoding="utf-8"?>${jsontoxml(invoiceDataItem)}`;

  return s3Service.putS3({ Bucket: bucketName, Key: invoiceS3Key, Body: invoiceS3Body });
}

exports.handler = async () => {
  try {
    // make sure lambda function have correct api type before running
    if (apiType !== 'dynamic365') {
      return;
    }

    // example for http request request
    const response = await axios.get(apiEndpoint);

    // in real world, we should get data from response instead of build fake data
    // craw resources
    crawOrder();
    crawInvoice();
  }
  catch(error) {
    console.log(error);
    throw error;
  }
}
