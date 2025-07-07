// Adaptador para AWS Lambda
const serverless = require('serverless-http');
const app = require('./index');

module.exports.handler = serverless(app);
