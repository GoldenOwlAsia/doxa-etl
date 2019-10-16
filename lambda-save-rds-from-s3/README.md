# lambda-save-data-from-s3-to-rds
Save s3 data to rds base on create trigger

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
    DB_HOST:
    DB_PORT:
    DB_USER:
    DB_PASSWORD:
    DB_NAME:
```

Use serverless cli to deploy to lamba

```
  sls deploy --stage dev --aws-profile serverless
```
