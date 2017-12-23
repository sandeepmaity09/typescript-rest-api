import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';

// import routers
import PostRouter from './router/PostRouter';
import UserRouter from './router/UserRouter';

// Server class
class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        // Set up mongoose
        const MONGO_URI = 'mongodb://localhost/ba';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

        // config 
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(cors());

        // this.app.use((req)=>{
        //     //cors options
        // })
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();

        this.app.use('/', router);
        this.app.use('/api/v1/posts',PostRouter);
        this.app.use('/api/v1/users',UserRouter);
    }
}

export default new Server().app;