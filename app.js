// Imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');

// Local const
const customerRoutes = require('./src/routes/customerRoutes');
const config = require('./config');
const store = new session.MemoryStore()
const app = express();

// Application options & middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(morgan(config.morgan));
app.use(cors());
app.use(session({secret: 'the secret', saveUninitialized: true, resave: true}));
app.use((req, res, next) => {
  console.log()
  next()
})

// routes
app.use('/customers', customerRoutes);

// Function export
module.exports = app;
