const dotenv = require('dotenv');
const env = process.env.NODE_ENV;
dotenv.config();

// Development environment
const dev = {
  env: 'development',
  port: process.env.DEV_PORT,
  db: process.env.DEV_DB,
  secret: process.env.DEV_SECRET,
  session: process.env.DEV_SESSION,
  morgan: 'dev',
  AWSAccess: process.env.AWSAccessKeyId,
  AWSSecret: process.env.AWSSecretKey,
  bucketName: process.env.bucketName
}

// Production environment
const prod = {
  env: 'production',
  port: process.env.PROD_PORT,
  db: process.env.PROD_DB,
  secret: process.env.PROD_SECRET,
  session: process.env.PROD_SESSION,
  morgan: ' ',
  AWSAccess: process.env.AWSAccessKeyId,
  AWSSecret: process.env.AWSSecretKey,
  bucketName: process.env.bucketName
}

// Test environment
const test = {
  env: 'test',
  port: process.env.TEST_PORT,
  db: process.env.TEST_DB,
  secret: process.env.TEST_SECRET,
  session: process.env.TEST_SESSIONS,
  morgan: ' ',
  AWSAccess: process.env.AWSAccessKeyId,
  AWSSecret: process.env.AWSSecretKey,
  bucketName: process.env.bucketName
}

//Configurations exports
const config = { dev, prod, test }
module.exports = config[env];
