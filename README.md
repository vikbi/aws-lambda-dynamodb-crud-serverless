### To Deploy Coller api on aws with cloudformation

1. System setup

## Setup & Deployment
Deploying the api will require [npm](https://www.npmjs.com/), [serverless](https://serverless.com/), the [AWS CLI](https://aws.amazon.com/cli/), and an AWS account. The AWS credentials for that account should be [set up in the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html). Configure the right aws secretKey and AccessKey from console.


First, download the dependencies using `npm`:
```
npm install
```
Once all dependencies installed completely it is ready for deploy. serverless will do all the necessary stuff with aws cloudformation, so run the following command in console.

```
sns deploy
```

First serverless will create the package of the code, It will create the s3 bucket in aws, cloudformation stack will be loaded and as per the cloudformation script it will generate the required resources. you can do the necessary settings in `serverless.yml` file like name change of dynamoDb table, aws region, dynamoDb read/write capacity, stack name.

On successful execution of deployment through serverless, two endpoint will be generated in the command line as follows.

```
Serverless: Stack update finished...
Service Information
service: vivek-task
stage: dev
region: us-east-1
stack: vivek-task-dev
resources: 17
api keys:
  None
endpoints:
  POST - https://72isufq5s7.execute-api.us-east-1.amazonaws.com/dev/coller
  GET - https://72isufq5s7.execute-api.us-east-1.amazonaws.com/dev/coller
functions:
  addColler: vivek-task-dev-addColler
  getCollers: vivek-task-dev-getCollers
layers:
  None
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
```