const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mockdb = new MongoMemoryServer();

connect = async () => {
    const URI = await mockdb.getUri();
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
    await mongoose.connect(URI, mongooseOptions)
};

closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mockdb.stop()
}

clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

module.exports = { connect, closeDatabase, clearDatabase }
