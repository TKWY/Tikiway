const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  mongodb_user: process.env.MONGODB_USER,
  mongodb_password: process.env.MONGODB_PASSWORD,
  mongodb_cluster: process.env.MONGODB_CLUSTER,
  mongodb_document: process.env.MONGODB_DOCUMENT,
  salt: process.env.SALT
}