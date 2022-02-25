import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';

import { timetable } from './services/timetables'
import { errorHandler } from './utils/errorHandler';

const app = express();
const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
};
const PORT = 3000;

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/timetables/3/', timetable);
app.use(errorHandler);

app.options('*', cors());

export async function startServer() {
    return app.listen(PORT, async () => {
        console.log(`Application started on port ${PORT}!`);
    });
}