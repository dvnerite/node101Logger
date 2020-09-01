
const express = require('express');
const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = './log.csv'
const app = express();

var initialData = [];

app.use((req, res, next) => {
    // write your logging code here
    const agent = req.get("user-agent").replace(/,/g, '');
        // var agentAsString = '"' + agent + '"';
        initialData.push(agent)
        // console.log(agent);
    
    const time = new Date().toISOString();
        // var timeFormatted = time.toISOString()
        initialData.push(time)

    const method = req.method;
        initialData.push(method);

    const resource = req.url;
        initialData.push(resource);

    const version = `HTTP/` + req.httpVersion;
        initialData.push(version);
    
    const status = '200';
        initialData.push(status);

    // var arrayToString = initialData.join(",");
    // var stringWithLineBreak = arrayToString + "\n";

//     fs.appendFile("/log.csv", stringWithLineBreak, (err) => {
//         if (err) throw err;
//         function emptyArray() {
//             initialData.length = 0;
//         }
//         emptyArray();
//     })
   
// });

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
    // const csvFilePath = '/Users/wilson/projects/node101-log-all-the-things/server/log.csv';
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        res.status(200).send(jsonObj);
        // console.log(jsonObj);
    });
});

module.exports = app;