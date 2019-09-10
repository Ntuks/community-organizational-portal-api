import 'dotenv/config';
import * as bodyParser from 'body-parser';
import * as cors from "cors";
import * as express from 'express';
import { connect } from 'mongoose';
import Controller from './controllers/Controller';
import Routes from './routes/index';
 
class Server {
  public app: express.Application;
 
  constructor(controllers: Controller[]) {
    this.app = express();
 
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }
 
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());

    // options for cors midddleware
    const options:cors.CorsOptions = {
      allowedHeaders: ["Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credetials","X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
      credentials: true,
      optionsSuccessStatus: 200,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: process.env.FRONTEND_URL,
      preflightContinue: false
    };

    // use cors middleware
    this.app.use(cors(options));
  }
 
  private initializeRoutes() {
    this.app.use('/auth', Routes.AuthRouter);

    Routes.APIRoutes.forEach(route => {
      this.app.use('/api/v1/', route);
    });
  }
 
  private connectToTheDatabase() {
    const { MONGODB_URI } = process.env;
    connect(MONGODB_URI,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }).then(() => console.log('Database Connection Successful'));
  }
}
 
export default Server;