import http from 'http';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { DATABASES } from './settings';
import routers from './routers';

function getRequestListener(): Application {
    const app = express();
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('combined'));
    for (const [path, router] of routers) {
        app.use(path, router);
    }
    return app;
}

async function main() {
    const app = getRequestListener();
    const serverOptions = {}
    const server = http.createServer(serverOptions, app);
    await mongoose.connect(DATABASES.default.uri, DATABASES.default.options);
    server.listen(3000, () => {
        console.info(server.address());
    });
}

main();