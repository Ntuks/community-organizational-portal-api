import { json } from 'body-parser';

export default function(app) {
  app.use(json());
}
