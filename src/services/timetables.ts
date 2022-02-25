import express from 'express';

export const timetable = express.Router();

timetable.post('/ping', async (req, res, next) => {
    try {
        return next(Promise.resolve({ data:req.body.test[1], status:200 }));
    }catch (error) {
        return next(error);
    } 
});
