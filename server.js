const debug = require('debug')('server:debug');
const app = require('./app.js');
const db = require('./src/db/index.js');
const config = require('./config');

const listen = app.listen(config.app.port, () => {
  const msg = (`Server is running on port ${ config.app.port } and in ${config.env} mode. \n\Connected to db: ${config.db}`)
  debug(msg);
  console.log(msg)
})

// Function start client server.
db.connect()
  .then(() => { return listen });

