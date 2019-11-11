const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.putS3 = async (params) => {
  try {
    await s3.putObject(params).promise();
    console.log(`Successfully put object: ${params.key}`);
  } catch (error) {
    console.log(`Fail to put object to: ${params.key}`)
  }
}
