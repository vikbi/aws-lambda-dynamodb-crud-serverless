'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4');

const collerTable = process.env.COLLER_TABLE;

// Create a response : standard practice to provide response with status code
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}
// Sort the records by unique id i.e sortkey
function sortById(a, b) {
  if (a.sortKey > b.sortKey) {
    return -1;
  } else return 1;
}
// add new coller record
module.exports.addColler = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);
  //validation to check the required information
  if (
    !reqBody.activity ||
    reqBody.activity.trim() === '' ||
    !reqBody.barking ||
    reqBody.barking.trim() === '' ||
    !reqBody.location ||
    reqBody.location.trim() === ''
  ) {
    return callback(
      null,
      response(400, {
        error: 'Coller should have activity, barking and location information'
      })
    );
  }

  //unique id for each record, also a sort key
  const coller = {
    id: uuid(),
    activity: reqBody.activity,
    barking: reqBody.barking,
    location: reqBody.location,
    createdAt: new Date().toISOString()
  };

  return db
    .put({
      TableName: collerTable,
      Item: coller
    })
    .promise()
    .then(() => {
      callback(null, response(201, coller));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

// Get all collers list
// Promise uses to avoid callback hell : best practice
module.exports.getCollers = (event, context, callback) => {
  return db
    .scan({
      TableName: collerTable
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortById)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
