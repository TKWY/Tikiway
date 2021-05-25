// Imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Routes Imports
const customerRoutes = require('./src/routes/customerRoutes');
const restaurantRoutes = require('./src/routes/restaurantRoutes');

// Local const

const config = require('./config');
const store = new session.MemoryStore()
const app = express();

// Swagger definition & options
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Backend API for Tikiway delivery service',
    version: '1.0.0',
    description: 'This is a REST API application made to server data for Tikiway Application',
    license: {
      name: 'Licensed under MIT',
      url: 'https://spdx.org/licenses/MIT.html'
    },
    contact: {
      name: 'Tikiway',
      url: 'contact@tikiway.com'
    }
  }
};

const options = {swaggerDefinition, apis: ['./src/routes/*.js']};
const swaggerSpec = swaggerJSDoc(options);
const swaggerDocument = require('./swagger.json');

// Application options & middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(morgan(config.morgan));
app.use(cors());
app.use(session({secret: 'the secret', saveUninitialized: true, resave: true}));

// routes
app.use('/customers', customerRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
