const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.putS3 = async (params) => {
  try {
    const response = await s3.putObject(params).promise();
    console.log(`Done put object to: ${params.key}`);

    return response;
  }
  catch (error) {
    console.log(`Fail put object to: ${params.key}`, error);
    throw error;
  }
}

module.exports.generateBucketKey = (companyName, resourceName, filename) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  return `in_craw/${companyName}/${resourceName}/year=${year}/month=${month}/day=${day}/${filename}`;
}
