var express = require('express');
var fs = require('fs');

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
    fs.readFile(robotsFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});

app.post('/api/robots/extinguish/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!fs.existsSync(extinguishFile)) {
        let data = {
            extinguishRobots: []
        };
        data.extinguishRobots.push(id);
        fs.writeFile(extinguishFile, JSON.stringify(data), 'utf8', (err, result) => {
            if (err) {
                throw err;
            }
            res.send(`ID ${id} added to extinguish list.`);
        });
    } else {
        let alreadyAddedIds;
        fs.readFile(extinguishFile, 'utf8', (err, result) => {
            if (err) {
                throw err
            };

            alreadyAddedIds = JSON.parse(result);
            if (!alreadyAddedIds.hasOwnProperty('extinguishRobots')) {
                alreadyAddedIds = {
                    extinguishRobots: []
                };
            }
            alreadyAddedIds.extinguishRobots.push(id);


            fs.writeFile(extinguishFile, JSON.stringify(alreadyAddedIds), 'utf8', (err, res) => {
                if (err) {
                    throw err;
                }
                console.log('Re-written extinguish file with new data');
            });
            res.send(`ID ${id} added to extinguish list.`);
        });
    }
});


app.post('/api/robots/recycle/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!fs.existsSync(recycleFile)) {
        let data = {
            recycleRobots: []
        };
        data.recycleRobots.push(id);
        console.log(JSON.stringify(data));
        fs.writeFile(recycleFile, JSON.stringify(data), 'utf8', (err, result) => {
            if (err) {
                throw err;
            }
            res.send(`ID ${id} added to recycle list.`);
        });
    } else {
        let alreadyAddedIds;
        fs.readFile(recycleFile, 'utf8', (err, result) => {
            if (err) {
                throw err
            };

            alreadyAddedIds = JSON.parse(result);

            if (!alreadyAddedIds.hasOwnProperty('recycleRobots')) {
                alreadyAddedIds = {
                    recycleRobots: []
                };
            }

            alreadyAddedIds.recycleRobots.push(id);

            fs.writeFile(recycleFile, JSON.stringify(alreadyAddedIds), 'utf8', (err, res) => {
                if (err) {
                    throw err;
                }
                console.log('Re-written recycle file with new data');
            });
            res.send(`ID ${id} added to recycle list.`);
        });
    }
});

app.post('/api/shipment/create', (req, res) => {
    const shipmentRobotIds = req.query.array;
    fs.writeFile(shipmentFile, shipmentRobotIds, 'utf8', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(`IDs ${JSON.stringify(shipmentRobotIds)} added to shipment list.`);
    });
});

app.listen(3000, () => {
    console.log('Started port on :3000');
});
