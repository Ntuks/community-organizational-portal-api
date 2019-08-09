import morgan from 'morgan';
import { stream as _stream } from '../config/winston';

export default function(app) {
  app.use(morgan('combined', { stream: _stream }));
}
