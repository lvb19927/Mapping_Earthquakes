// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create base layer to hold both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create map object w center, zoom and default layer.
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass map layers into layers controls and add to map
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON url.
// let airportData = "https://raw.githubusercontent.com/ChallahBack83/Mapping_Earthquakes/main/majorAirports.json";
// let torontoData = "https://raw.githubusercontent.com/ChallahBack83/Mapping_Earthquakes/main/Main/static/torontoRoutes.json";
// let torontoHoods = "https://raw.githubusercontent.com/ChallahBack83/Mapping_Earthquakes/main/Main/static/torontoNeighborhoods.json";

// Style object 
let myStyle = {
    color: "#ffffa1",
    weight: 2
    //fillColor: "yellow"
}

// grabbing GeoJSON data and adding pop up
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        // Set style for circleMarker using functions
        style: styleInfo
    }).addTo(map);
});

    // This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
    };
};
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
    return 1;
    }
    return magnitude * 4;
};




    // event that lets you knwo when user activates/deactivates a layer.
    map.on('overlayadd', onOverlayAdd);

    function onOverlayAdd(e){
        //do whatever
    }

 // There is a "baselayerchange' event defined here http://leafletjs.com/reference.html#control-layers Just bind it to the map object and you are good to go.

map.on('baselayerchange', function(e) {
  console.log(e);
});