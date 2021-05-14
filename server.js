const debug = require('debug')('server:debug');
const app = require('./app.js');
const server = require('./src/db/index.js');
const {port, env, db} = require('./config');

const PORT = port || process.env.PORT;

const listen = app.listen(PORT, () => {
  const msg = (`Server is running on port ${PORT} and in ${env} mode. \n\Connected to db: ${db}`)
  debug(msg);
})

server.connect()
  .then(() => {
    return listen
  });
