import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// May require additional time for downloading MongoDB binaries
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
const createConnection = async function createConnection() {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoReconnect: true,
    reconnectTries: 10,
    reconnectInterval: 1000,
    poolSize: 10,
    useFindAndModify: false,
    useCreateIndex: true,
  }, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const closeConnection = async function closeConnection() {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const cleanup = async function cleanup() {
  const collections = await mongoose.connection.db.listCollections().toArray();
  return Promise.all(
    collections
      .map(({ name }) => name)
      .map((collection) => mongoose.connection.db.collection(collection).drop()),
  );
};

export default {
  createConnection,
  closeConnection,
  cleanup,
};
