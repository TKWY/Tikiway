// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');

// Local const
const customerRoutes = require('./routes/customerRoutes');
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
app.use(morgan('dev'));
app.use(cors());
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));

// routes
app.use('/customers', customerRoutes);

// Running Application
app.listen(config.app.port, () => {
  console.log(`Listening on http://localhost:${config.app.port}`);
});
