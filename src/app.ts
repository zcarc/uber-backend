import cros from 'cors';
import { GraphQLServer } from "graphql-yoga";
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import decodeJWT from './utils/decodeJWT';

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({
      schema
    });
    this.middleware();
  }

  private middleware = (): void => {
    this.app.express.use(cros());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  // X-JWT: 원하는대로 지어도 상관없음 (백엔드, 프론트엔드 둘 다 생성해야함)
  private jwt = async(req, res, next): Promise<void> => {
    const token = req.get("X-JWT");
    if(token) {
      const user = await decodeJWT(token);
      console.log('user: ', user);
    }
    next();
  }
}

export default new App().app;