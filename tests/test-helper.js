const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mockDb = new MongoMemoryServer({binary: {version: 'latest'}});

connect = async () => {
    const URI = await mockDb.getUri();
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
  await mockDb.stop()
}

clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

const setup = () => {
  before((done) => {
    connect()
      .then(done)
      .catch(err => done(err))
  });

  beforeEach((done) => {
    clearDatabase()
      .then(done)
      .catch(err => done(err))
  });

  after((done) => {
    closeDatabase()
      .then(done)
      .catch(err => done(err))
  });
}

module.exports = setup
