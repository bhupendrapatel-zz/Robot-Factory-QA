var express = require('express');
var fs = require('fs');
var jsonfile = require('jsonfile');
var fp = require('lodash/fp');

const app = express();

let robotsFile = './data/robots.json';
let extinguishFile = './data/extinguish.json';
let recycleFile = './data/recycle.json';
let shipmentFile = './data/shipment.json';

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Undefined API');
});

app.get('/api/robots', (req, res) => {
    jsonfile.readFile(robotsFile, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(data);
    });
});

app.post('/api/robots/extinguish/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    let extinguishObj = jsonfile.readFileSync(extinguishFile);

    if(fp.indexOf(id)(extinguishObj["extinguishRobots"]) == -1) {
        extinguishObj["extinguishRobots"].push(id);
    }

    jsonfile.writeFileSync(extinguishFile, extinguishObj);

    res.send(`ID ${id} added to extinguish list.`);
});


app.post('/api/robots/recycle/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let recycleObj = jsonfile.readFileSync(recycleFile);

    if(fp.indexOf(id)(recycleObj["recycleRobots"]) == -1) {
        recycleObj["recycleRobots"].push(id);
    }

    jsonfile.writeFileSync(recycleFile, recycleObj);

    res.send(`ID ${id} added to recycle list.`);
});

app.post('/api/shipment/create', (req, res) => {
    const shipmentRobotIds = fp.map(parseInt)(JSON.parse(req.query.array));

    let shipmentObj = jsonfile.readFileSync(shipmentFile);

    shipmentObj["shipment"] = shipmentRobotIds;

    jsonfile.writeFileSync(shipmentFile, shipmentObj);

    res.send(`ID ${shipmentRobotIds} added to shipment list.`);
});

app.listen(3000, () => {
    console.log('Started port on :3000');
});
