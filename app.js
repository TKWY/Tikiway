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
app.use(morgan('tiny'));
app.use(cors());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 3000},
  store: store
}))

app.use((req, res, next) => {
  console.log(store)
  next()
})
// routes
app.use('/customers', customerRoutes);
