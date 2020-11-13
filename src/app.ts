import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from "cors";
import  * as fs  from 'fs';
import * as morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware';

class App {

    private app: express.Application;

    constructor(controllers: any) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        const  accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
        this.app.use(morgan('combined', {stream: accessLogStream}));
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller: any) => {
            this.app.use('/api', controller.router);
        });
    }

    public start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
}

export default App;