import mongoose from 'mongoose';
import config from '../config';

const uri = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_URI}/${config.DB_NAME}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('connected', (error) => {
  if (error) {
    console.log('Mongo db has an error ', error);
  }
  console.log('Mongo db is connected');
});

db.on('error', (error) => {
  console.log('Mongo db has an error ', error);
});

function createConnection() {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoReconnect: true,
    reconnectTries: 10,
    reconnectInterval: 1000,
    poolSize: 10,
    useFindAndModify: false,
    useCreateIndex: true,
    keepAlive: 10,
  });
}

module.exports = createConnection;
