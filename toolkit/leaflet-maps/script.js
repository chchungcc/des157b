(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([37.769421, -122.486214], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    var marker = L.marker([37.769421, -122.486214]).addTo(map);

    var circle = L.circle([37.77, -122.4662], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 120
    }).addTo(map);

    // var polygon = L.polygon([
    //     [37.766, -122.4620],
    //     [37.7623, -122.4620],
    //     [37.766, -122.4725],
    //     [37.7623, -122.4725]
    // ]).addTo(map);

    var rectangle = L.rectangle([
        [37.7623, -122.4620],
        [37.766, -122.4725],
    ]).addTo(map);

    marker.bindPopup("<b>The Amazing Golden Gate Park!</b>").openPopup();
    circle.bindPopup("Claude the Alligator was here!");
    rectangle.bindPopup("Where I like to walk :D");

    // var popup = L.popup()
    // .setLatLng([37.769421, -122.486214])
    // .setContent("I am a standalone popup.")
    // .openOn(map);

    // var popup = L.popup();

    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(map);
    // }

    // map.on('click', onMapClick);
}());