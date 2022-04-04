import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import swagger from './swagger'
import routers from './routes';
import swaggerFile from './docs/swagger-output.json'

const app = express();
const PORT = process.env.PORT || 3000;

// swagger();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/doc/', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routers)

export async function startServer() {
    return app.listen(PORT, async () => {
        console.log(`Application started on port ${PORT}!`);
    });
}