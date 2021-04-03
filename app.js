// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')


// Local imports
const customerRoutes = require('./routes/customerRoutes');
//const { port, mongodb_user, mongodb_password, mongodb_cluster, mongodb_document } = require('./config');
const config = require('./config')

// Running Application
const app = express();
app.listen(config.app.port, () => {
  console.log(`Listening on http://localhost:${config.app.port}`);
});


// Connect to mongodb
const dbURI = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.cluster}/${config.db.document}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
  .catch((err) => console.log(err));


// Application options & middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/customers', customerRoutes);