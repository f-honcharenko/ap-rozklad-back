const express = require('express');
const data = require('./output2.json');
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
        return res.json(responce).status(200);
    } catch (error) {
        return res.json({
            msg: "Непредвиденная ошибка сервера."
        }).status(500);
    }

});
app.get('/timetables/3/getInfo', (req, res) => {
    res.json({
        date: data.lastUpdate,
        teachers: Object.keys(data.teachers)
    }).status(200);
});
app.post('/timetables/3/getCal', (req, res) => {
    let _start = new Date(req.body.start);
    _start.setDate(_start.getDate() - 3);
    _start = _start.valueOf();
    let _end = new Date(req.body.end).valueOf();
    let _course = req.body.spec;
    let _subGroup = req.body.group;
    let _responce = [];
    console.log(_course);
    console.log(_subGroup);
    console.log(data[_course][_subGroup] ? "Найдено" : "Ошибка");
    for (date in data[_course][_subGroup]) {
        // console.log(date);
        if ((date > _start) && (date < _end)) {
            _responce.push(...data[_course][_subGroup][date])
        }
    }
    // console.log(_start, _end);
    res.json(_responce).status(200);
})

app.get('/', (req, res) => {
    return res.send("Pong!");
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})