const dotenv = require('dotenv');
const env = process.env.NODE_ENV;
dotenv.config(); // Activate dotenv usage

// Development environment
const dev = {
  app: { port: process.env.DEV_PORT },
  db: {
    user: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD,
    cluster: process.env.DEV_CLUSTER,
    document: process.env.DEV_DOCUMENT
  },
  secret: process.env.DEV_SECRET,
  session: process.env.DEV_SESSION,
  morgan: 'dev'
}

// Production environment
const prod = {
  app: { port: process.env.PROD_PORT },
  db: {
    user: process.env.PROD_USER,
    password: process.env.PROD_PASSWORD,
    cluster: process.env.PROD_CLUSTER,
    document: process.env.PROD_DOCUMENT
  },
  secret: process.env.PROD_SECRET,
  session: process.env.PROD_SESSION,
  morgan: 'production'
}

// Test environment
const test = {
  app: { port: process.env.TEST_PORT },
  db: {
    user: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    cluster: process.env.TEST_CLUSTER,
    document: process.env.TEST_DOCUMENT
  },
  secret: process.env.TEST_SECRET,
  session: process.env.TEST_SESSIONS,
  morgan: 'test'
}

//Configurations exports
const config = { dev, prod, test}
module.exports = config[env];
