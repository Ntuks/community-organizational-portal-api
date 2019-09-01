import cors from 'cors';

export default function(app) {
  app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      credentials: true,
      optionsSuccessStatus: 200,
      'Access-Control-Allow-Origin': [process.env.FRONTEND_URL],
      'Access-Control-Allow-Credentials': true,
    })
  );
}
