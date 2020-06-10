const express = require('express');
const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = './server/log.csv'
const app = express();

app.use((req, res, next) => {
    // write your logging code here
    const agent = req.headers["user-agent"].replace(/,/g, '');
    const time = new Date().toISOString();
    const method = req.method;
    const resource = req.url;
    const version = `HTTP/${req.httpVersion}`;
    const status = '200';

    fs.appendFile(csvFilePath, agent+",", (err) => {
        if (err) throw err;
        fs.appendFile(csvFilePath, time+",", (err) => {
            if (err) throw err;
            fs.appendFile(csvFilePath, method+",", (err) => {
                if (err) throw err;
                fs.appendFile(csvFilePath, resource+",", (err) => {
                    if (err) throw err;
                    fs.appendFile(csvFilePath, version+",", (err) => {
                        if (err) throw err;
                        fs.appendFile(csvFilePath, status+"\n", (err) => {
                            if (err) throw err;
                            console.log(`${agent},${time},${method},${resource},${version},${status}`)
                            next();
                        });
                    });
                });
            });
        });
    });
});

app.get('/', (req, res) => {
    // write your code to respond "ok" here
    res.status(200).send('ok');
});

app.get('/logs', (req, res) => {
    // write your code to return a json object containing the log data here
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        res.send(jsonObj);
        console.log(jsonObj);
    });
});

module.exports = app;