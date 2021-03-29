// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Local imports
const customerRoutes = require('./routes/customerRoutes');
const { port, mongodb_user, mongodb_password } = require('./config')

// Running Application
const app = express()

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// Connect to mongodb
const dbURI = `mongodb+srv://${mongodb_user}:${mongodb_password}@cluster0.b11y0.mongodb.net/node-tuts?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('connected to db.'))
  .catch((err) => console.log(err))

// Application options & middleware
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
app.use(morgan('dev'))

// routes
app.use('/customers', customerRoutes);