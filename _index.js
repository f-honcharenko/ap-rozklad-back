const express = require('express');
const data = require('./data/output2.json');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.use('/timetables/3/getSpecs', (req, res) => {
    try {
        let responce = {};
        Object.keys(data).forEach(element => {
            responce[element] = Object.keys(data[element]);
        });
        delete responce.lastUpdate
        return res.status(200).json(responce);
    } catch (error) {
        return res.status(500).json({
            msg: "Непредвиденная ошибка сервера."
        });
    }

});
app.get('/timetables/3/getInfo', (req, res) => {
    try {
        return res.status(200).json({
            date: data.lastUpdate,
            teachers: Object.keys(data.teachers)
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Непредвиденная ошибка сервера."
        });
    }
});
app.post('/timetables/3/getCal', (req, res) => {
    try {
        let _start = new Date(req.body.start);
        _start.setDate(_start.getDate() - 3);
        _start = _start.valueOf();
        const _end = new Date(req.body.end).valueOf();
        const _course = req.body.spec;
        const _subGroup = req.body.group;
        let _responce = [];
        if (data[_course][_subGroup]) {
            for (date in data[_course][_subGroup]) {
                if ((date > _start) && (date < _end)) {
                    _responce.push(...data[_course][_subGroup][date])
                }
            }
            return res.status(200).json(_responce);
        } else {
            return res.status(400).json({
                msg: "По данному запросу ничего не найдено"
            });
        }
    } catch (error) {
        return res.status(500).json({
            msg: "Непредвиденная ошибка сервера."
        });
    }
})

app.get('/', (req, res) => {
    return res.send("Pong!");
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})