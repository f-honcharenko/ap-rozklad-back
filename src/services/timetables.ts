import express from 'express';
import rawData from '../data/output.json'

const timetable = express.Router();

timetable.get('/getSpecs/', async (req, res, next) => {
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

timetable.get('/getInfo/', async (req, res, next) => {
    try {
        return next(Promise.resolve({ data:{
            date: rawData.lastUpdate,
            teachers: Object.keys(rawData.teachers)
        }, status:200 }));
    }catch (error) {
        return next(error);
    } 
});

timetable.post('/getCal/', async (req, res, next) => {
    try {
        let _responce = [];
        let _temp = new Date(req.body.start);
        _temp.setDate(_temp.getDate() - 3);
        const _start = _temp.valueOf();
        const _end = new Date(req.body.end).valueOf();
        const _course = req.body.spec;
        const _subGroup = req.body.group;
        if (!_start || !_end || !_course || !_subGroup) { 
            return next(Promise.resolve({ data: {msg:'Недостаточно входных параметров'}, status:400 }));
        }
        if (!rawData[_course] || !rawData[_course][_subGroup]) {
            return next(Promise.resolve({ data: {msg:'По данному запросу ничего не найдено'}, status:400 }));
        }else{
            for (const date in rawData[_course][_subGroup]) {
                if ((Number(date) > _start) && (Number(date) < _end)) {
                    _responce.push(...rawData[_course][_subGroup][date])
                }
            }
            return next(Promise.resolve({ data:_responce, status:200 }));
        }
    }catch (error) {
        return next(error);
    } 
});

timetable.get('/teachers/', async (req, res, next) => {
    try { 
        return next(Promise.resolve({ data: {list:Object.keys(rawData.teachers), count:Object.keys(rawData.teachers).length  },status:200}))
    } catch (error) {
        return next(error);
    }
})

export default timetable

