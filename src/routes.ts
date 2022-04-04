
import express from 'express';
import timetable from './services/timetables';
import { errorHandler } from './utils/errorHandler';

const routers = express.Router();

routers.use('/timetables/3/',timetable)
routers.use(errorHandler);

export default routers;
