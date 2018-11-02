mapboxgl.accessToken = 'pk.eyJ1IjoidGFyYXNncml0c2Vua28iLCJhIjoiY2pueG84OWR3MTMydDNwcndkc2Nla3JzcyJ9.o08Y0fXney9VoeqmdAI-bg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 14
});

var GEOJSON_URL = "http://localhost:3005/geojson";

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            handleLocation(pos);
        }, function() {
            handleLocationError(true, null);
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, null);
    }

    map.on('load', () => {
        // Add the source first
        map.addSource('point', {
            "type": "geojson",
            data: GEOJSON_URL
        });
        
        map.addLayer({
            "id": "point-markers",
            "source": "point",
            "type": "circle",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#007cbf"
            }
        });
        
        // Every 5 seconds reload for new points
        window.setInterval(loadPoints, 5000);
    });
}

function loadPoints() {
    console.log("Queried for points");

    map.getSource('point').setData(GEOJSON_URL);
}

function handleLocation(pos) {
    map.on('load', () => { map.setCenter([pos.lng, pos.lat]) });
        
    // Send the position to the server
    socket.emit('position', pos);
}

function handleLocationError(browserHasGeolocation, pos) {
    console.log(browserHasGeolocation, pos);
}