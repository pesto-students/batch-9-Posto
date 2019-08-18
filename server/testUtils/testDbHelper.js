import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
const createConnection = async function create() {
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
    if (err) console.error(err);
  });
};

const closeConnection = async function close() {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const cleanup = async function clean() {
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
