const AWS = require('aws-sdk');
const Pool = require('pg').Pool;

const s3 = new AWS.S3();
const pool = new Pool({
  host: process.env['DB_HOST'],
  port: process.env['DB_PORT'],
  user: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
});

exports.handler = (event) => {
  for (const record of event.Records) {
    console.log('Added file object: ', JSON.stringify(record.s3));

    s3.getObject({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
    }, (error, data) => {
      if (error) {
        throw error;
      }

      const taskData = JSON.parse(data.Body.toString('ascii'));
      const insertCmd = 'INSERT INTO tasks (title, completed, user_id, created_at) VALUES ($1, $2, $3, $4)';
      const insertValues = [taskData['title'], taskData['completed'], parseInt(taskData['user_id']) || null, (new Date())];

      pool.query(insertCmd, insertValues, (error, results) => {
        if (error) {
          throw error;
        }
        console.log('Saved task to database');
      });
    });
  }
}
