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

timetable.get('/getDay/', async (req, res, next) => {
    try {
        console.log(req.query);
        let _responce = [];
        let course;
        const date:Date = new Date(Number(req.query.date));
        const group = req.query.group;
        if (date && group) {
            for (const course_ in rawData) { 
                for (const group_ in rawData[course_]) { 
                    if (group_ == group) { 
                        console.log(course_);
                        course = course_;
                        break;
                    }
                }
            }
            let start = new Date((date));
            let end = new Date((date));
            start.setHours(3,0,1)
            end.setHours(26, 59, 59)
            console.log(start.valueOf());
            console.log(date.valueOf());
            console.log(end.valueOf());
            console.log(start)
            console.log(date)
            console.log(end)
            for (const date_ in rawData[course][group]) {
                // if ((Number(new Date(Number(date)).getMonth()) == Number(new Date(Number(date_)).getMonth()))&&(Number(new Date(Number(date)).getDay()) == Number(new Date(Number(date_)).getDay()))) { 
                    // console.log(rawData[course][group_][date_]);    
                    // console.log('day correct: ', course_, group_, new Date(Number(date_)));
                        // _responce.push(...rawData[course][group][date_])
                    // }
                if ((Number(date_) > start.valueOf()) && (Number(date_) < end.valueOf())) {
                    // console.log(rawData[course][group][date_);
                _responce.push(...rawData[course][group][date_])
            }
            }
            return next(Promise.resolve({ data: {group, list:_responce} , status:200}))
        } else { 
            return next(Promise.resolve({ data: {msg:'По данному запросу ничего не найдено'}, status:404 }));
        }
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
            return next(Promise.resolve({ data: {msg:'По данному запросу ничего не найдено'}, status:404 }));
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

export default timetable

