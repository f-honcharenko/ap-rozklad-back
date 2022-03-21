
import express from 'express';
// import timetable from './services/timetables';
import webhook from './services/webhook';
import { errorHandler } from './utils/errorHandler';

const routers = express.Router();

// routers.use('/timetables/3/',timetable)
routers.use('/webhook',webhook)
routers.use(errorHandler);

export default routers;
