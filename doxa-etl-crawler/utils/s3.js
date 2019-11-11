import * as AWS from 'aws-sdk';
const s3 = new AWS.S3();

export const putS3 = async (params) => {
  try {
    await s3.putObject(params).promise();
    console.log(`Successfully put object: ${params.key}`);
  } catch (error) {
    console.log(`Fail to put object to: ${params.key}`)
  }
}
