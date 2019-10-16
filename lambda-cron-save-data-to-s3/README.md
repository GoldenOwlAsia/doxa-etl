# Schedule job in AWS lambda
Example serverless config for schedule job to fetch json data from remote url and save to S3 on AWS Lambda.

## Install
Make sure you have installed [serverless](https://serverless.com).

## Deploy
```
  npm install
```

Add `serverless-config/env/env.${stage}.yml` file

```
  awsRegion:
  awsAccount:

  environment:
    BUCKET_NAME:
```

Use serverless cli to deploy to lamba

```
  sls deploy --stage dev --aws-profile serverless
```
