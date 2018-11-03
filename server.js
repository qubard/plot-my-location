const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

const uuidv1 = require('uuid/v1');

app.listen(80);

app.use(express.static('public'))

var agents = {};

io.on('connection', function (socket) {
    let uuid = uuidv1().split("-")[0];

    console.log(uuid, "connected", agents);
    
    socket.broadcast.emit('connected', agents);

    socket.on('position', (position) => {
        console.log("got position from", uuid, position);
        
        // Add the agent to our dictionary with their position
        agents[uuid] = position;
        
        // Let the new agent know about the other agent(s)
        socket.emit('agents', agents);
    });
    
    socket.on('disconnect', () => {
        console.log(uuid, "agent disconnected.");
        delete agents[uuid];
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

http.listen(3005, () => {
    console.log('listening on *:3005');
});