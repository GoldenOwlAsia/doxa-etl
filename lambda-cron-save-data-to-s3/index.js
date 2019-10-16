const axios = require('axios');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const FETCH_URL = 'https://jsonplaceholder.typicode.com/todos';

const randomBetween = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.handler = () => {
  axios.get(FETCH_URL)
    .then((response) => {
      const currentDate = new Date;
      const data = response.data.map((dataItem) => Object.assign({}, dataItem, { title: `${dataItem.title} - ${currentDate}` }));

      const randomIndex = randomBetween(response.data.length - 1, 0);
      const dataItem = data[randomIndex];

      const params = {
        Bucket: process.env['BUCKET_NAME'],
        Key: `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}/tasks-${currentDate.getTime()}.xml`,
        Body: `<?xml version="1.0" encoding="utf-8"?><todos><task><userId>${dataItem['userId']}</userId><title>${dataItem['title']}</title><completed>${dataItem['completed']}</completed></task></todos>`,
      };
      s3.putObject(params, (error, data) => {
        if (error) {
          console.log(error);
        }
        else {
          console.log('Successfully put object');
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
