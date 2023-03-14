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
    color: "blue",
     weight: 1,
    fillColor: "yellow"
 }

// grabbing GeoJSON data and adding pop up
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // console.log(data);
    L.geoJSON(data).addTo(map);
    //     {
    //      style: myStyle,
    //     onEachFeature: function(feature, layer) {
    //         layer.bindPopup("<h3>Neighborhood: " + feature.properties.AREA_NAME 
    //         ); 
    //     }
    // }
    // ).addTo(map);
});
    // Creating a GeoJson layer with the retrieved data.






    // event that lets you knwo when user activates/deactivates a layer.
    map.on('overlayadd', onOverlayAdd);

    function onOverlayAdd(e){
        //do whatever
    }

 // There is a "baselayerchange' event defined here http://leafletjs.com/reference.html#control-layers Just bind it to the map object and you are good to go.

map.on('baselayerchange', function(e) {
  console.log(e);
});