const debug = require('debug')('server:debug');
const app = require('./app.js');
const server = require('./src/db/index.js');
const {port, env, db} = require('./config');

const listen = app.listen(port, () => {
  const msg = (`Server is running on port ${port} and in ${env} mode. \n\Connected to db: ${db}`)
  debug(msg);
})

server.connect()
  .then(() => {
    return listen
  });
