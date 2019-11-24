import Server from "./server";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";

const server = new Server(
    [
      new AuthController(),
      new UserController(),
    ],
);
  
server.listen();