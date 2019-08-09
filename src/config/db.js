import { connect } from 'mongoose';
import winston from './winston.js';

export default function() {
  const db = process.env.MONGODB_URI;
  connect(
    db,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  ).then(() => winston.info('Database Connection Successful'));
}
