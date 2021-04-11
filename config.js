const dotenv = require('dotenv');
const env = process.env.NODE_ENV;
dotenv.config(); // Activate dotenv usage

// Development environment
const dev = {
  env: 'development',
  app: { port: process.env.DEV_PORT },
  db: 'mongodb://127.0.0.1:27017/TikiClient',
  secret: process.env.DEV_SECRET,
  session: process.env.DEV_SESSION,
  morgan: 'dev'
}

// Production environment
const prod = {
  env: 'production',
  app: { port: process.env.PROD_PORT },
  db: `mongodb+srv://${process.env.PROD_USER}:${process.env.PROD_PASSWORD}@${process.env.PROD_CLUSTER}/${process.env.PROD_DOCUMENT}?retryWrites=true&w=majority`,
  secret: process.env.PROD_SECRET,
  session: process.env.PROD_SESSION,
  morgan: 'production'
}

// Test environment
const test = {
  env: 'test',
  app: { port: process.env.TEST_PORT },
  db: 'mongodb://127.0.0.1:27017/TikiClient',
  secret: process.env.TEST_SECRET,
  session: process.env.TEST_SESSIONS,
  morgan: 'test'
}

//Configurations exports
const config = { dev, prod, test}
module.exports = config[env];
