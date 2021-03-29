const express = require('express');
const customerRoutes = require('./routes/customerRoutes')

const app = express()
const port = 3000;

// Running Application
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// Go to customers routes
app.use('/customers', customerRoutes);