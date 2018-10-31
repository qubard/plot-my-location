mapboxgl.accessToken = 'pk.eyJ1IjoidGFyYXNncml0c2Vua28iLCJhIjoiY2pueG84OWR3MTMydDNwcndkc2Nla3JzcyJ9.o08Y0fXney9VoeqmdAI-bg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 14
});

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            handleLocation(pos);
        }, function() {
            handleLocationError(true, pos);
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, null);
    }
}

function addPoint(pos) {
    console.log("Added point", pos);

    map.addSource('point', {
        "type": "geojson",
        data: {
           "type": "FeatureCollection",
           "features": [{
               "type": "Feature",
               "geometry": {
                   "type": "Point",
                   "coordinates": [
                       pos.lng,
                       pos.lat
                   ]
               }
           }]
        }
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
    
    map.setCenter([pos.lng, pos.lat]);
}

function handleLocation(pos) {
    if (!map.loaded()) {
        map.on('load', function() {
            addPoint(pos);
        });
    } else {
        addPoint(pos);
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    console.log(browserHasGeolocation, pos);
}