const app = require('./app.js');
const db = require('./src/db/index.js');
const config = require('./config');


// Function start client server.
db.connect()
  .then(() => {
    app.listen(config.app.port, () => {
      console.log(`Listening on port: ${config.app.port}`)
    });
  });

