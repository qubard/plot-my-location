const express = require('express')
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');
const uuidv1 = require('uuid/v1');

const options = {
    cert: fs.readFileSync('fullchain.pem'),
    key: fs.readFileSync('privkey.pem')
};

http.createServer(app).listen(80);
var server = https.createServer(options, app).listen(443);

const io = require('socket.io').listen(server);

app.use(express.static('public'))

var agents = {};

io.on('connection', function (socket) {
    let uuid = uuidv1().split("-")[0];

    console.log(uuid, "connected", agents);

    socket.on('position', (position) => {
    console.log("got position from", uuid, position);
        
    // Add the agent to our dictionary with their position
    agents[uuid] = position;
    
    // Let the new agent know about the other agent(s)
    socket.emit('agents', agents);
        socket.broadcast.emit('agents', agents);
    });
    
    socket.on('disconnect', () => {
        console.log(uuid, "agent disconnected.");
        delete agents[uuid];
        socket.broadcast.emit('agents', agents);
    });
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

function geoJsonFromAgents() {
    let jsonObj = {};
    let features = [];
    for (var k in agents) {
        let pos = agents[k];
        features.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [pos.lng, pos.lat]
            }
        });
    }
    
    jsonObj["type"] = "FeatureCollection";
    jsonObj["features"] = features;
    
    return jsonObj;
}

app.get('/geojson', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(geoJsonFromAgents()));
});
