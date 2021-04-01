const dotenv = require('dotenv');
const env = process.env

dotenv.config();
module.exports = {
  port: env.PORT,
  secret: env.SECRET,
  mongodb_user: env.MONGODB_USER,
  mongodb_password: env.MONGODB_PASSWORD,
  mongodb_cluster: env.MONGODB_CLUSTER,
  mongodb_document: env.MONGODB_DOCUMENT,
  salt: env.SALT
}