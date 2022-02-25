import express from 'express';
import rawData from '../data/output.json'

export const timetable = express.Router();

timetable.post('/ping', async (req, res, next) => {
    try {
        return next(Promise.resolve({ data:req.body.test[1], status:200 }));
    }catch (error) {
        return next(error);
    } 
});

timetable.post('/getSpecs/', async (req, res, next) => {
    try {
        let responce = {lastUpdate:null};
        Object.keys(rawData).forEach(element => {
            responce[element] = Object.keys(rawData[element]);
        });
        delete responce.lastUpdate
        return next(Promise.resolve({ data:responce, status:200 }));
    }catch (error) {
        return next(error);
    } 
});


timetable.post('/getInfo/', async (req, res, next) => {
    try {
        return next(Promise.resolve({ data:{
            date: rawData.lastUpdate,
            teachers: Object.keys(rawData.teachers)
        }, status:200 }));
    }catch (error) {
        return next(error);
    } 
});
