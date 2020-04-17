import { GraphQLServer } from "graphql-yoga";
import cros from 'cors';
import helmet from 'helmet';
import logger from 'morgan';

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({});
    this.middleware();
  }

  private middleware = (): void => {
    this.app.express.use(cros());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
  };
}

export default new App().app;