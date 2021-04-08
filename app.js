// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');

// Local const
const customerRoutes = require('./src/routes/customerRoutes');
const config = require('./config');
const store = new session.MemoryStore()
const app = express();

// Connect to mongodb
const dbURI = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.cluster}/${config.db.document}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
  .catch((err) => console.log(err));

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
