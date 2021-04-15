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
  morgan: 'dev'
}

// Production environment
const prod = {
  env: 'production',
  port: process.env.PROD_PORT,
  db: `mongodb+srv://${process.env.PROD_USER}:${process.env.PROD_PASSWORD}@${process.env.PROD_CLUSTER}/${process.env.PROD_DOCUMENT}?retryWrites=true&w=majority`,
  secret: process.env.PROD_SECRET,
  session: process.env.PROD_SESSION,
  morgan: 'production'
}

// Test environment
const test = {
  env: 'test',
  port: process.env.TEST_PORT,
  db: process.env.TEST_DB,
  secret: process.env.TEST_SECRET,
  session: process.env.TEST_SESSIONS,
  morgan: ' '
}

//Configurations exports
const config = { dev, prod, test}
module.exports = config[env];
