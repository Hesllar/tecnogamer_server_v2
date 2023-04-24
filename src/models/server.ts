import path from 'path';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors from 'cors';
import db from '../db/config';
import routes from '../routes'

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //Conexión DB
        this.DBconnection();

        //Middleware
        this.middleware();

        //Rutas
        this.route();
    }


    async DBconnection() {
        try {
            await db.authenticate();
        } catch (error) {
            throw error
        }
    }

    middleware() {

        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname, './public')));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true,
            limit: '50mb'
        }));
    }


    route() {
        this.app.use('', ...Object.values(routes))
    }

    tableRoute() {

        let objRouteList: { methodWhitPath: [{ method: string, path: string }] } = {
            methodWhitPath: [{ method: '', path: '' }]
        };

        Object.values(routes).forEach(({ stack }) => {
            stack.forEach(({ route }) => {
                route.stack.forEach(({ method }: { method: string }) => {
                    objRouteList.methodWhitPath.push({ method, path: route.path })
                });
            });
        });

        objRouteList.methodWhitPath.shift();

        console.table(objRouteList.methodWhitPath)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Server is connected on ${this.port}`));
        console.log("************************************************************************")
        console.log("* TECNOGAMER - API")
        console.log("* ENV: ", 'LOCAL')
        console.log("* ROUTES: ")
        console.log("************************************************************************");

        this.tableRoute();
    }
}

export default Server;