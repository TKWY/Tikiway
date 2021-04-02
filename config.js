const dotenv = require('dotenv');
const env = process.env.NODE_ENV;
dotenv.config(); // Activate dotenv usage

// Development environnement
const dev = {
  app: {
    port: 3000
  },
  db: {
    user: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD,
    cluster: process.env.DEV_CLUSTER,
    document: process.env.DEV_DOCUMENT
  }
}

// Production environnement
const prod = {
  app: {
    port: 3000
  },
  db: {
    user: process.env.PROD_USER,
    password: process.env.PROD_PASSWORD,
    cluster: process.env.PROD_CLUSTER,
    document: process.env.PROD_DOCUMENT
  }
}

// Test environnement
const test = {
  app: {
    port: 3000
  },
  db: {
    user: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    cluster: process.env.TEST_CLUSTER,
    document: process.env.TEST_DOCUMENT
  }
}

//Configurations exports
const config = {
  dev,
  prod,
  test
}

module.exports = config[env];
